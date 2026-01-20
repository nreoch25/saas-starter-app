"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { CardCompact } from "@/components/card-compact";
import { Skeleton } from "@/components/ui/skeleton";
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

  const queryClient = useQueryClient();
  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });
  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey });
  const handleUpdateComment = () => queryClient.invalidateQueries({ queryKey });

  const {ref, inView} = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <Fragment>
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

        {isFetchingNextPage && !hasNextPage && !inView && (
          (<Fragment>
            <div className="flex gap-x-2">
              <Skeleton className="h-[82px] w-full" />
              <Skeleton className="h-[40px] w-[40px]" />
            </div>
            <div className="flex gap-x-2">
              <Skeleton className="h-[82px] w-full" />
              <Skeleton className="h-[40px] w-[40px]" />
            </div>
          </Fragment>
        ))}
      </div>

      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-right text-xs italic">No more comments.</p>
        )}
      </div>
    </Fragment>
  );
};

export { Comments };
