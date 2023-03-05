import Vacancies from "@components/Items/Vacancies";
import { API_URL } from "@src/constants/common";
import { IVacancy } from "@ts/entities";
import React from "react";
/* 
Similar to `getStaticProps`.
const fetchData = async (): Promise<IPost[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

This request should be refetched on every request... Similar to `getServerSideProps`.
const fetchData = async (): Promise<IPost[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: "no-store" });

  await new Promise((res, rej) => {
    setTimeout(() => {
      res("");
    }, 1000);
  });

  return res.json();
};
*/

const fetchItems = async (): Promise<IVacancy[]> => {
  const res = await fetch(API_URL + "/vacancies", { cache: "no-store" });
  return await res.json();
};

const Page = async () => {
  const items = await fetchItems();

  return <Vacancies vacancies={items} />;
};

export default Page;
