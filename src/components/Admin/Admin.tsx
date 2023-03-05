"use client";
import { Pagination } from "@components/UI/Pagination/Pagintaion";
import { APP_ROUTES } from "@src/constants/routes";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Admin = () => {
  const params = useSearchParams();
  const pageSize = 10;
  const totalCount = 300;
  const currentPage = params.get("page") || "1";

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<number[]>([]);

  const getData = useCallback(
    (offset: number): Promise<number[]> =>
      new Promise((resolve) => {
        const length = pageSize > totalCount - offset ? totalCount - offset : pageSize;
        const newData: number[] = Array.from({ length }).map((_, i) => offset + i + 1);
        setTimeout(() => {
          resolve(newData);
        }, 100);
      }),
    [pageSize, totalCount]
  );

  const onShowMoreClick = useCallback(
    async (offset: number) => {
      setOffset(offset);
      const newData = await getData(offset);
      setData((data) => [...data, ...newData]);
    },
    [pageSize, totalCount, getData]
  );

  useEffect(() => {
    const newOffset = pageSize * (Number(currentPage) - 1);
    setOffset(newOffset);
    getData(newOffset).then(setData);
  }, [currentPage, setOffset, pageSize, getData]);

  console.log(offset, "offset");

  return (
    <div>
      <Pagination
        totalCount={totalCount}
        getHref={(pageNum) => `${APP_ROUTES.admin}/?page=${pageNum}`}
        offset={offset}
        pageSize={pageSize}
        onShowMoreClick={onShowMoreClick}
      />
    </div>
  );
};

export default Admin;
