"use client";

import { Fragment } from "react";

import { CardCompact } from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { CommentCreateForm } from "@/features/comments/components/comment-create-form";
import { CommentDeleteButton } from "@/features/comments/components/comment-delete-button";
import { CommentEditButton } from "@/features/comments/components/comment-edit-button";
import { CommentItem } from "@/features/comments/components/comment-item";
import { CommentWithMetadata } from "@/features/comments/types";

type CommentsProps = {
  ticketId: string;
  comments?: CommentWithMetadata[];
};

const Comments = async ({ ticketId, comments = [] }: CommentsProps) => {
  const handleMore = () => {
    console.log("More");
  };
  return (
    <Fragment>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-4 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton key="0" id={comment.id} />,
                    <CommentEditButton key="1" id={comment.id} content={comment.content} />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center ml-8">
        <Button variant="ghost" onClick={handleMore}>
          More
        </Button>
      </div>
    </Fragment>
  );
};

export { Comments };
