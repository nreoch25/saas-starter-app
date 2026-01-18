"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";

import { Pagination } from "@/components/pagination";
import { paginationOptions, paginationParser, searchParser } from "@/features/ticket/search-params";
import { TicketWithMetadata } from "@/features/ticket/types";
import { PaginatedData } from "@/types/pagination";

type TicketPaginationProps = {
  paginatedTicketMetadata: PaginatedData<TicketWithMetadata>['metadata'];
};

const TicketPagination = ({ paginatedTicketMetadata }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(paginationParser, paginationOptions);
  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search !== prevSearch.current) {
      setPagination({ ...pagination, page: 0 });
      prevSearch.current = search;
    }
  }, [search, setPagination, pagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
};

export { TicketPagination };
