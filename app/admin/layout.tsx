import { APP_ROUTES } from "@src/constants/routes";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import s from "./layout.module.scss";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <div className={s.inner}>
          <Link href={APP_ROUTES.admin_create_item}>Create Item</Link>
          <Link href={APP_ROUTES.admin_create_type}>Create Type</Link>
          <Link href={APP_ROUTES.admin_forms}>Forms</Link>
        </div>
      </header>
      <main> {children}</main>
    </div>
  );
};

export default Layout;
