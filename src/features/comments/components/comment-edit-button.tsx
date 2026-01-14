"use client";

import { LucidePencil } from "lucide-react";

import { updateComment } from "../actions/update-comment";

import { useEditDialog } from "@/components/edit-dialog";
import { Button } from "@/components/ui/button";

type CommentEditButtonProps = {
  id: string;
  content: string;
};

const CommentEditButton = ({ id, content }: CommentEditButtonProps) => {
  const [editButton, editDialog] = useEditDialog({
    action: updateComment.bind(null, id),
    initialValue: content,
    trigger: (
      <Button variant="outline" size="icon">
        <LucidePencil className="w-4 h-4" />
      </Button>
    ),
  });

  return (
    <>
      {editDialog}
      {editButton}
    </>
  );
};

export { CommentEditButton };
