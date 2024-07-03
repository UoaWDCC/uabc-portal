import React from "react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MemberApprovalTablePaginationProps {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  pageIndex: number;
  pageCount: number;
  previousPage: () => void;
  nextPage: () => void;
  setPageIndex: (pageIndex: number) => void;
}

const PAGINATION_BUTTON_COUNT = 5;

export function MemberApprovalTablePagination({
  hasPreviousPage,
  hasNextPage,
  pageIndex,
  pageCount,
  previousPage,
  nextPage,
  setPageIndex,
}: MemberApprovalTablePaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            className="p-0"
            onClick={previousPage}
            disabled={!hasPreviousPage}
          >
            <PaginationPrevious />
          </Button>
        </PaginationItem>
        {pageCount <= PAGINATION_BUTTON_COUNT
          ? Array.from({ length: pageCount }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index === pageIndex}
                  onClick={() => setPageIndex(index)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          : pageIndex > pageCount - Math.ceil(PAGINATION_BUTTON_COUNT / 2)
            ? Array.from({ length: PAGINATION_BUTTON_COUNT }).map(
                (_, index) => {
                  const itemPageIndex =
                    pageCount - PAGINATION_BUTTON_COUNT + index;
                  return (
                    <PaginationItem key={itemPageIndex}>
                      <PaginationLink
                        isActive={pageIndex === itemPageIndex}
                        onClick={() => setPageIndex(itemPageIndex)}
                      >
                        {itemPageIndex + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                },
              )
            : pageIndex < PAGINATION_BUTTON_COUNT - 2
              ? Array.from({ length: PAGINATION_BUTTON_COUNT }).map(
                  (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={index === pageIndex}
                        onClick={() => setPageIndex(index)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )
              : Array.from({ length: PAGINATION_BUTTON_COUNT }).map(
                  (_, index) => {
                    const itemPageIndex = pageIndex - 2 + index;
                    return (
                      <PaginationItem key={itemPageIndex}>
                        <PaginationLink
                          isActive={pageIndex === itemPageIndex}
                          onClick={() => setPageIndex(itemPageIndex)}
                        >
                          {itemPageIndex + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  },
                )}
        <PaginationItem>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => nextPage()}
            disabled={!hasNextPage}
          >
            <PaginationNext />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
