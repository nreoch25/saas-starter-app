"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";

import { setCookie } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { validateEmailVerificationCode } from "@/features/auth/utils/validate-email-verification-code";
import { createLocalSession } from "@/features/password/utils/create-local-session";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const emailVerificationSchema = z.object({
  code: z.string().length(8),
});

export const emailVerification = async (_actionState: ActionState, formData: FormData) => {
  const { user } = await getAuthOrRedirect({ checkEmailVerified: false, checkOrganization: false });

  try {
    const { code } = emailVerificationSchema.parse({
      code: formData.get("code"),
    });

    const validCode = await validateEmailVerificationCode(user.id, user.email, code);

    if (!validCode) {
      return toActionState("ERROR", "Invalid or expired code");
    }

    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });

    await createLocalSession(user.id);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setCookie("toast", "Email verified");
  redirect(ticketsPath());
};
