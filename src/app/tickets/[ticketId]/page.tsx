import { initialTickets } from "@/data";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketDetailPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div>
      <h2 className="text-6xl font-bold">{ticket?.title}</h2>
      <p className="text-lg">{ticket.content}</p>
      <p className="text-lg">{ticket.status}</p>
    </div>
  );
};

export default TicketDetailPage;
