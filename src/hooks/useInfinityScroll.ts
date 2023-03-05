/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

function useInfiniteScroll<T>(collection: T[], perPage: number, deps: unknown[]) {
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, deps);

  const items = collection || [];
  const data = useMemo(() => items.slice(0, page * perPage), [items, page, perPage]);

  return {
    ref,
    data,
    hasMore: Math.ceil(items.length / perPage) > page,
  };
}

export default useInfiniteScroll;
