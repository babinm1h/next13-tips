import Link from "next/link";
import React, { FC, PropsWithChildren } from "react";
import st from "./MainLayout.module.scss";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={st.wrapper}>
      <header className={st.head}>
        <Link href="/timer">Timer</Link>
        <Link href="/login">Login</Link>
        <Link href="/posts">posts</Link>
      </header>
      <main className={st.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
