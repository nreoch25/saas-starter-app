import { Fragment, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { RedirectToast } from "@/components/redirect-toast";
import { Spinner } from "@/components/ui/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
const TicketsPage = () => {
  return (
    <Fragment>
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading
          title="Tickets Page"
          description="All your tickets are listed here"
        />

        <CardCompact
          title="Create Ticket"
          description="A new ticket will be created"
          content={<TicketUpsertForm />}
          className="w-full max-w-[420px] self-center"
        />

        <ErrorBoundary fallback={<Placeholder label="Something went wrong!" />}>
          <Suspense fallback={<Spinner />}>
            <TicketList />
          </Suspense>
        </ErrorBoundary>
      </div>
      <RedirectToast />
    </Fragment>
  );
};

export default TicketsPage;
