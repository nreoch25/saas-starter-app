"use server";

import { Fragment } from "react";

import { CardCompact } from "@/components/card-compact";
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
    </Fragment>
  );
};

export { Comments };
