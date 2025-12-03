const homePath = () => "/";
const ticketsPath = () => "/tickets";
const ticketDetailPath = (ticketId: string) => `${ticketsPath()}/${ticketId}`;

export { homePath, ticketDetailPath, ticketsPath };
