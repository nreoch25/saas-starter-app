import Link from "next/link";
import { Suspense } from "react";

import { Heading } from "@/components/heading";
import { Spinner } from "@/components/ui/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { ticketsPath } from "@/paths";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="All tickets" description="Tickets by everyone at one place" />

      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath()} className="underline">
          Go to Tickets Page
        </Link>
      </div>

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default HomePage;
