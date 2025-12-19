"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookie } from "@/actions/cookies";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  revalidatePath(ticketsPath());
  await setCookie("toast", "Ticket deleted successfully");
  redirect(ticketsPath());
};
