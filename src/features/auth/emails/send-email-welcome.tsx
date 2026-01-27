import EmailWelcome from "@/emails/auth/email-welcome";
import { resend } from "@/lib/resend";
import { ticketsPath } from "@/paths";
import { getBaseUrl } from "@/utils/url";

export const sendEmailWelcome = async (username: string, email: string) => {
  const welcomeLink = getBaseUrl() + ticketsPath();
  return await resend.emails.send({
    from: "email@app.ntrpdb.com",
    to: email,
    subject: "Welcome to SAAS Starter App",
    react: <EmailWelcome toName={username} url={welcomeLink} />,
  });
};
