"use client";
import { VacanciesApi } from "@src/api/vacanciesApi";
import { IVacancy } from "@ts/entities";
import { IVacanciesFilters } from "@ts/types";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Filters from "./Filters/Filters";
import s from "./Vacancies.module.scss";
import Vacancy from "./Vacancy/Vacancy";

interface IProps {
  vacancies: IVacancy[];
}

const Vacancies = ({ vacancies }: IProps) => {
  const [filters, setFilters] = useState<IVacanciesFilters>({
    expirience: "",
    format: "",
    minSalary: "",
    maxSalary: "",
    order: "",
  });

  const [items, setItems] = useState(vacancies);

  const { refetch } = useQuery({
    enabled: false,
    queryFn: async () => await VacanciesApi.getAll(filters),
    onSuccess(data) {
      setItems(data);
    },
  });

  return (
    <div className={s.wrapper}>
      <Filters refetchVacancies={refetch} filters={filters} setFilters={setFilters} />
      <ul className={s.list}>
        {items?.map((v) => (
          <Vacancy {...v} key={v.id} />
        ))}
      </ul>
    </div>
  );
};

export default Vacancies;
