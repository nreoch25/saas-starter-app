"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { setCookie } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketDetailPath, ticketsPath } from "@/paths";

const upsertTicketSchema = z.object({
  title: z.string().min(1, "Title is required").max(191),
  content: z.string().min(1, "Content is required").max(1024),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: { id: id || "" },
      update: data,
      create: data,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    await setCookie("toast", "Ticket updated successfully");
    redirect(ticketDetailPath(id));
  }

  return toActionState("SUCCESS", "Ticket created successfully");
};
