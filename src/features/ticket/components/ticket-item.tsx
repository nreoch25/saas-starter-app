import clsx from "clsx";
import { LucideArrowUpRightFromSquare, LucideMoreVertical, LucidePencil } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { TICKET_ICONS } from "../constants";
import { TicketMoreMenu } from "./ticket-more-menu";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketWithMetadata } from "@/features/ticket/types";
import { ticketDetailPath, ticketEditPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

type TicketItemProps = {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  comments?: ReactNode;
};

const TicketItem = async ({ ticket, isDetail, comments }: TicketItemProps) => {
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketDetailPath(ticket.id)}>
        <LucideArrowUpRightFromSquare className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = ticket.isOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = ticket.isOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx("w-full flex flex-col gap-y-4", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="truncate">{ticket.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={clsx("whitespace-break-spaces", {
                "line-clamp-3": !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">{toCurrencyFromCent(ticket.bounty)}</p>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
      </div>

      {comments}
    </div>
  );
};

export { TicketItem };
