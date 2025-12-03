import Link from "next/link";

import { ticketsPath } from "@/paths";

const HomePage = () => {
  return (
    <div>
      <h2 className="text-6xl font-bold">Home Page</h2>
      <Link href={ticketsPath()} className="underline">
        Go to Tickets Page
      </Link>
    </div>
  );
};

export default HomePage;
