import MainLayout from "@components/layouts/MainLayout/MainLayout";
import pluralize, { intlPluralize, toRub } from "@src/helpers/pluralize";
import { IUser } from "@ts/entities";
import React from "react";

const num1 = 174999;
const num2 = 12578;
const num3 = 777999777;

const vars = ["час", "часа", "часов"];

const Home = () => {
  return (
    <MainLayout>
      <div>home paga</div>
      <div>{intlPluralize(100)}</div>
      <div>{intlPluralize(1)}</div>
      <div>{intlPluralize(4)}</div>
      <div>{num1.toLocaleString("ru", { style: "currency", currency: "USD" })}</div>
      <div>{num2.toLocaleString("ru", { style: "currency", currency: "rub", currencyDisplay: "name" })}</div>
      <div>{num3.toLocaleString("en", { style: "currency", currency: "USD", currencyDisplay: "name" })}</div>
      <div>{toRub(num3)}</div>

      <div>{pluralize(1, vars)}</div>
      <div>{pluralize(10, vars)}</div>
      <div>{pluralize(3, vars)}</div>
    </MainLayout>
  );
};

export default Home;
