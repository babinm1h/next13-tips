import { IVacancy } from "@ts/entities";
import React from "react";
import s from "./Vacancy.module.scss";

interface IProps extends IVacancy {}

const Vacancy = ({ name, format, salary, expirience }: IProps) => {
  return (
    <li className={s.item}>
      <div className="">{name}</div>
      <div className="">{salary}</div>
      <div className="">{format}</div>
      <div className="">{expirience}</div>
    </li>
  );
};

export default Vacancy;
