import React, { useCallback, useMemo } from "react";
import cn from "classnames";

import styles from "./Pagination.module.scss";
import Link from "next/link";

interface IPageChooserProps {
  canPreviousPage: boolean;
  canNextPage: boolean;
  currentPage: number;
  pages: Array<number | null>;
  getHref: (page: number) => string;
}

export const PageChooser: React.FC<IPageChooserProps> = (props) => {
  const { canPreviousPage, canNextPage, currentPage, pages, getHref } = props;

  const getHrefCallback = useCallback(getHref, []);

  const pageChooseButtons = useMemo(
    () =>
      pages.map((pageNumber) => {
        if (pageNumber === null) {
          return <span className={styles.pageButton}>...</span>;
        }

        return (
          <Link
            key={pageNumber}
            href={getHrefCallback(pageNumber + 1)}
            className={cn(styles.page, { [styles.activePage]: currentPage === pageNumber + 1 })}
          >
            {pageNumber + 1}
          </Link>
        );
      }),
    [currentPage, pages, getHrefCallback]
  );

  return (
    <div className={styles.pages}>
      <Link className={cn(!canPreviousPage && styles.hidden, styles.arrow)} href={getHref(currentPage - 1)}>
        {"<"}
      </Link>

      {pageChooseButtons}

      <Link className={cn(!canNextPage && styles.hidden, styles.arrow)} href={getHref(currentPage + 1)}>
        {">"}
      </Link>
    </div>
  );
};
