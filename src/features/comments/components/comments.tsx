"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { CardCompact } from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { CommentCreateForm } from "@/features/comments/components/comment-create-form";
import { CommentDeleteButton } from "@/features/comments/components/comment-delete-button";
import { CommentEditButton } from "@/features/comments/components/comment-edit-button";
import { CommentItem } from "@/features/comments/components/comment-item";
import { getComments } from "@/features/comments/queries/get-comments";
import { CommentWithMetadata } from "@/features/comments/types";
import { PaginatedData } from "@/types/pagination";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

type Cursor = { id: string; createdAt: number } | undefined;

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryKey = ["comments", ticketId];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }: { pageParam: Cursor }) =>
        getComments(ticketId, pageParam),
      initialPageParam: undefined as Cursor,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const handleMore = () => fetchNextPage();
  const queryClient = useQueryClient();
  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });
  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey });
  const handleUpdateComment = () => queryClient.invalidateQueries({ queryKey });

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />
      <div className="flex flex-col gap-y-2 ml-8">
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
        {hasNextPage && (
          <Button
            variant="ghost"
            onClick={handleMore}
            disabled={isFetchingNextPage}
          >
            More
          </Button>
        )}
      </div>
    </>
  );
};

export { Comments };
