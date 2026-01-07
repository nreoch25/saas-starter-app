const homePath = () => "/";

const signUpPath = () => "/sign-up";
const signInPath = () => "/sign-in";
const passwordForgotPath = () => "/password-forgot";

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
  signInPath,
  signUpPath,
  ticketDetailPath,
  ticketEditPath,
  ticketsPath,
};
