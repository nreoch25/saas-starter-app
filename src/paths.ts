const homePath = () => "/";

const signUpPath = () => "/sign-up";
const signInPath = () => "/sign-in";
const passwordForgotPath = () => "/password-forgot";
const passwordResetPath = () => "/password-reset";
export const emailVerificationPath = () => "/email-verification";

const accountProfilePath = () => "/account/profile";
const accountPasswordPath = () => "/account/password";

const ticketsPath = () => "/tickets";
const ticketDetailPath = (ticketId: string) => `${ticketsPath()}/${ticketId}`;
const ticketEditPath = (ticketId: string) => `${ticketsPath()}/${ticketId}/edit`;

export {
  accountPasswordPath,
  accountProfilePath,
  homePath,
  passwordForgotPath,
  passwordResetPath,
  signInPath,
  signUpPath,
  ticketDetailPath,
  ticketEditPath,
  ticketsPath,
};
