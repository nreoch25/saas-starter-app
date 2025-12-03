import Link from "next/link";

import { initialTickets } from "@/data";
import { ticketDetailPath } from "@/paths";

const TicketsPage = () => {
  return (
    <div>
      {initialTickets.map((ticket) => (
        <div key={ticket.id}>
          <h2 className="text-2xl font-bold">{ticket.title}</h2>
          <Link
            href={ticketDetailPath(ticket.id)}
            className="text-sm underline"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TicketsPage;
