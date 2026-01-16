"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketDetailPath } from "@/paths";

const updateCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const updateComment = async (id: string, _actionState: ActionState, formData: FormData) => {
  const { user } = await getAuthOrRedirect();

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment || !isOwner(user, comment)) {
      return toActionState("ERROR", "Not authorized", formData);
    }

    const data = updateCommentSchema.parse(Object.fromEntries(formData));

    await prisma.comment.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath(ticketDetailPath(comment.ticketId));

    return toActionState("SUCCESS", "Comment updated", formData);
  } catch (error) {
    return fromErrorToActionState(error);
  }
};
