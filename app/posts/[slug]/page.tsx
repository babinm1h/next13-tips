import TestPageItem from "@components/TestPage/TestPageItem";
import React from "react";

const Page = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  console.log(params);
  return <TestPageItem slug={parseInt(params.slug)} />;
};

export default Page;
