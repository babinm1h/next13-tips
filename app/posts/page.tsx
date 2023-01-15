import React from "react";

interface IPost {
  title: string;
}

// Similar to `getStaticProps`.
// const fetchData = async (): Promise<IPost[]> => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   return res.json();
// };

// This request should be refetched on every request.
// Similar to `getServerSideProps`.
const fetchData = async (): Promise<IPost[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: "no-store" });

  await new Promise((res, rej) => {
    setTimeout(() => {
      res("");
    }, 1000);
  });

  return res.json();
};

const Page = async () => {
  const data = await fetchData();

  return (
    <div>
      {data.map((d) => (
        <div>{d.title}</div>
      ))}
    </div>
  );
};

export default Page;
