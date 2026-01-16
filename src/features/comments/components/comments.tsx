"use client";

import { Fragment, useState } from "react";

import { CardCompact } from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { CommentCreateForm } from "@/features/comments/components/comment-create-form";
import { CommentDeleteButton } from "@/features/comments/components/comment-delete-button";
import { CommentEditButton } from "@/features/comments/components/comment-edit-button";
import { CommentItem } from "@/features/comments/components/comment-item";
import { getComments } from "@/features/comments/queries/get-comments";
import { CommentWithMetadata } from "@/features/comments/types";

type CommentsProps = {
  ticketId: string;
  paginatedComments: {
    list: CommentWithMetadata[];
    metadata: { count: number; hasNextPage: boolean };
  };
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const morePaginatedComments = await getComments(ticketId, comments.length);
    const moreComments = morePaginatedComments.list;

    setComments([...comments, ...moreComments]);
    setMetadata(morePaginatedComments.metadata);
  };

  const handleDeleteComment = (id: string) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
  };

  const handleUpdateComment = (comment: CommentWithMetadata | undefined) => {
    if (!comment) {
      return;
    }

    setComments((prevComments) => prevComments.map((c) => (c.id === comment.id ? comment : c)));
  };

  const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    if (!comment) {
      return;
    }

    setComments((prevComments) => [comment, ...prevComments]);
  };

  return (
    <Fragment>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} onCreateComment={handleCreateComment} />}
      />
      <div className="flex flex-col gap-y-4 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                    <CommentEditButton
                      key="1"
                      id={comment.id}
                      content={comment.content}
                      onUpdateComment={handleUpdateComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center ml-8">
        {metadata.hasNextPage && (
          <Button variant="ghost" onClick={handleMore}>
            More
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export { Comments };
