"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

import { setCookie } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { sendEmailVerification } from "@/features/auth/emails/send-email-verification";
import { generateEmailVerificationCode } from "@/features/auth/utils/generate-email-verification-code";
import { hashPassword } from "@/features/auth/utils/hash-and-verify";
import { createLocalSession } from "@/features/password/utils/create-local-session";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .max(191, { message: "Username must be less than 191 characters" })
      .refine((value) => !value.includes(" "), "Username cannot contain spaces"),
    email: z.string().min(1, { message: "Email is required" }).max(191).email(),
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

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse(Object.fromEntries(formData));

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const verificationCode = await generateEmailVerificationCode(user.id, email);
    await sendEmailVerification(username, email, verificationCode);
    await createLocalSession(user.id);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return toActionState("ERROR", "Either email or username is already in use", formData);
    }

    return fromErrorToActionState(error, formData);
  }

  await setCookie("toast", "Sign up successful");
  redirect(ticketsPath());
};
