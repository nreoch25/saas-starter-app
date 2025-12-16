const homePath = () => "/";
const ticketsPath = () => "/tickets";
const ticketDetailPath = (ticketId: string) => `${ticketsPath()}/${ticketId}`;
const ticketEditPath = (ticketId: string) =>
  `${ticketsPath()}/${ticketId}/edit`;

export { homePath, ticketDetailPath, ticketEditPath, ticketsPath };
