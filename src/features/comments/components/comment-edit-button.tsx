"use client";

import { LucidePencil } from "lucide-react";

import { updateComment } from "../actions/update-comment";

import { useEditDialog } from "@/components/edit-dialog";
import { ActionState } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { CommentWithMetadata } from "@/features/comments/types";

type CommentEditButtonProps = {
  id: string;
  content: string;
  onUpdateComment?: (comment: CommentWithMetadata | undefined) => void;
};

const CommentEditButton = ({ id, content, onUpdateComment }: CommentEditButtonProps) => {
  const [editButton, editDialog] = useEditDialog({
    action: updateComment.bind(null, id),
    initialValue: content,
    trigger: (
      <Button variant="outline" size="icon">
        <LucidePencil className="w-4 h-4" />
      </Button>
    ),
    onSuccess: (actionState: ActionState<CommentWithMetadata | undefined>) => {
      onUpdateComment?.(actionState.data);
    },
  });

  return (
    <>
      {editDialog}
      {editButton}
    </>
  );
};

export { CommentEditButton };
