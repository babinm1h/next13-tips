import Link from "next/link";
import React, { FC, PropsWithChildren } from "react";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <header style={{ backgroundColor: "bisque", padding: "20px" }}>
        <Link href={"/posts"}>POSTS</Link>
      </header>
      {children}
    </div>
  );
};

export default RootLayout;
