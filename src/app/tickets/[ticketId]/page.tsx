import { notFound } from "next/navigation";
import { Fragment } from "react";

import { RedirectToast } from "@/components/redirect-toast";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketDetailPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <Fragment>
      <div className="flex justify-center animate-fade-from-top">
        <TicketItem ticket={ticket} isDetail={true} />
      </div>
      <RedirectToast />
    </Fragment>
  );
};

export default TicketDetailPage;
