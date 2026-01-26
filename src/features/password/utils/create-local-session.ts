import { generateRandomToken } from "@/features/auth/utils/crypto";
import { setSessionCookie } from "@/features/auth/utils/session-cookie";
import { createSession } from "@/lib/lucia";

const createLocalSession = async (userId: string) => {
  const sessionToken = generateRandomToken();
  const session = await createSession(sessionToken, userId);

  await setSessionCookie(sessionToken, session.expiresAt);
};

export { createLocalSession };
