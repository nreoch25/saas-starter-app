import { PrismaPg } from "@prisma/adapter-pg";

import "dotenv/config";

import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const seed = async () => {
  try {
    const t0 = performance.now();
    
    // Clear existing data
    console.log("Deleting existing data...");
    await prisma.session.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();

    // Seed tickets
    console.log("Creating tickets...");
    const tickets = [
      {
        title: "Ticket 1",
        content: "This is the first ticket",
        status: "DONE" as const,
        bounty: 499,
        deadline: new Date().toISOString().split("T")[0],
      },
      {
        title: "Ticket 2",
        content: "This is the second ticket",
        status: "OPEN" as const,
        bounty: 399,
        deadline: new Date().toISOString().split("T")[0],
      },
      {
        title: "Ticket 3",
        content: "This is the third ticket",
        status: "IN_PROGRESS" as const,
        bounty: 599,
        deadline: new Date().toISOString().split("T")[0],
      },
    ];

    await prisma.ticket.createMany({
      data: tickets,
    });

    console.log("Seeding completed successfully!");
    console.log(`Created ${tickets.length} tickets`);
    const t1 = performance.now();
    console.log(`Seeding completed in ${Math.round(t1 - t0)} milliseconds`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seed();
