"use server";

import { z } from "zod";

import { generatePasswordResetLink } from "../utils/generate-password-reset-link";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";

const passwordForgotSchema = z.object({
  email: z.email().min(1, { message: "Is required" }).max(191),
});

export const passwordForgot = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email } = passwordForgotSchema.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toActionState("ERROR", "Incorrect email", formData);
    }

    const passwordResetLink = await generatePasswordResetLink(user.id);

    // TODO: Send email to user with reset password link
    // instead we will just log the link to the console
    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Check your email for a reset link");
};
