import { sendEmailVerification } from "../emails/send-email-verification";

import { generateEmailVerificationCode } from "@/features/auth/utils/generate-email-verification-code";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

export const emailVerificationEvent = inngest.createFunction(
  { id: "email-verification" },
  { event: "app/auth.signup" },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const verificationCode = await generateEmailVerificationCode(user.id, user.email);

    const result = await sendEmailVerification(user.username, user.email, verificationCode);

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  }
);
