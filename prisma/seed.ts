import { PrismaPg } from "@prisma/adapter-pg";

import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket",
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket",
    status: "OPEN" as const,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket",
    status: "IN_PROGRESS" as const,
  },
];

const seed = async () => {
  try {
    const t0 = performance.now();
    console.log("Deleting existing tickets...");
    await prisma.ticket.deleteMany();
    console.log("Creating new tickets...");
    await prisma.ticket.createMany({
      data: tickets,
    });
    console.log("Seeding completed successfully!");
    const t1 = performance.now();
    console.log(`Seeding completed in ${Math.round(t1 - t0)} milliseconds`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seed();
