"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { setCookie } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { generateRandomToken, hashToken } from "@/features/auth/utils/crypto";
import { hashPassword } from "@/features/auth/utils/hash-and-verify";
import { setSessionCookie } from "@/features/auth/utils/session-cookie";
import { createSession } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(191, { message: "Password must be less than 191 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(191, { message: "Password must be less than 191 characters" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const passwordReset = async (
  tokenId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { password } = passwordResetSchema.parse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword") as string,
    });

    const tokenHash = hashToken(tokenId);

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        tokenHash,
      },
    });

    if (passwordResetToken) {
      await prisma.passwordResetToken.delete({
        where: {
          tokenHash,
        },
      });
    }

    if (!passwordResetToken || Date.now() > passwordResetToken.expiresAt.getTime()) {
      return toActionState("ERROR", "Expired or invalid verification token", formData);
    }

    await prisma.session.deleteMany({
      where: { userId: passwordResetToken.userId },
    });

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: {
        id: passwordResetToken.userId,
      },
      data: {
        passwordHash,
      },
    });

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, passwordResetToken.userId);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookie("toast", "Password reset successfully");
  redirect(ticketsPath());
};
