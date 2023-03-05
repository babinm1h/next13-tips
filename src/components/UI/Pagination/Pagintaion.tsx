import React, { useCallback } from "react";

import { PageChooser } from "./PageChooser";
import { IUsePaginationOptions, usePagination } from "@src/hooks/usePagination";

import styles from "./Pagination.module.scss";

interface IPaginationProps extends IUsePaginationOptions {
  onShowMoreClick: (offset: number) => void;
  getHref: (page: number) => string;
  pageSize: number;
}

export const Pagination: React.FC<IPaginationProps> = (props) => {
  const { onShowMoreClick, pageSize, getHref } = props;
  const { canNextPage, canPreviousPage, currentPage, pagesCount, availableOnNextPage, pages } =
    usePagination(props);

  const handleShowMoreClick = useCallback(() => {
    onShowMoreClick(pageSize * currentPage);
  }, [onShowMoreClick, pageSize, currentPage]);

  if (pagesCount <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <PageChooser
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        currentPage={currentPage}
        pages={pages}
        getHref={getHref}
      />
      {availableOnNextPage > 0 && (
        <button onClick={handleShowMoreClick}>Показать еще {availableOnNextPage}</button>
      )}
    </div>
  );
};
