import { useMemo } from "react";

export interface IUsePaginationOptions {
  totalCount: number;
  pageSize: number;
  offset: number;
}

export function usePagination({ totalCount, pageSize, offset }: IUsePaginationOptions) {
  const pagesCount = Math.ceil(totalCount / pageSize);
  const currentPage = Math.ceil(offset / pageSize) + 1;

  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < pagesCount;

  const availableOnNextPage =
    totalCount - offset - pageSize > pageSize ? pageSize : totalCount - offset - pageSize;
    
  const pages = useMemo(() => {
    const delta = 4;
    const lastPage = pagesCount - 1;
    const pages: Array<number | null> = [0];

    let start = currentPage - delta - 1;
    let end = currentPage + delta;

    if (start <= 0) {
      end += Math.abs(start) + 1;
    }

    if (end > lastPage) {
      start -= end - lastPage;
    }

    if (start > 1) {
      pages.push(null);
      start += 1;
    } else if (start < 1) {
      start = 1;
    }

    if (end < lastPage) {
      end -= 1;
    } else {
      end = lastPage;
    }

    for (let index = start; index < end; index++) {
      pages.push(index);
    }

    if (end < lastPage) {
      pages.push(null);
    }

    pages.push(lastPage);

    return pages;
  }, [currentPage, pagesCount]);

  return {
    canPreviousPage,
    canNextPage,
    pagesCount,
    currentPage,
    availableOnNextPage,
    pages,
  };
}
