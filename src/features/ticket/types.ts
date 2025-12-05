type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE";

type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
};

export type { Ticket, TicketStatus };
