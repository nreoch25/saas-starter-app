const homePath = () => "/";

const signUpPath = () => "/sign-up";
const signInPath = () => "/sign-in";
const passwordForgotPath = () => "/password-forgot";

const ticketsPath = () => "/tickets";
const ticketDetailPath = (ticketId: string) => `${ticketsPath()}/${ticketId}`;
const ticketEditPath = (ticketId: string) =>
  `${ticketsPath()}/${ticketId}/edit`;

export { homePath, passwordForgotPath, signInPath, signUpPath, ticketDetailPath, ticketEditPath, ticketsPath };

