"use client";
import { RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import { VacanciesApi } from "@src/api/vacanciesApi";
import { vacanciesSortOptions } from "@src/constants/common";
import { EXPIRIENCE_TYPES, IVacancy, WORK_FORMATS } from "@ts/entities";
import { IVacanciesFilters } from "@ts/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from "react-query";
import s from "./Filters.module.scss";

interface IProps {
  setFilters: React.Dispatch<React.SetStateAction<IVacanciesFilters>>;
  filters: IVacanciesFilters;
  refetchVacancies: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<IVacancy[], unknown>>;
}

const Filters = ({ refetchVacancies, setFilters, filters }: IProps) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof IVacanciesFilters
  ) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  useEffect(() => {
    refetchVacancies();
  }, [filters]);

  return (
    <div className={s.wrapper}>
      <div>
        <TextField
          onChange={(e) => handleChangeFilter(e, "minSalary")}
          value={filters.minSalary}
          label="Мин ЗП"
          type="number"
        />
      </div>
      <div>
        <TextField
          onChange={(e) => handleChangeFilter(e, "maxSalary")}
          value={filters.maxSalary}
          label="Макс ЗП"
          type="number"
        />
      </div>
      <div>
        <RadioGroup
          defaultValue=""
          onChange={(e) => handleChangeFilter(e, "order")}
          name="order"
          value={filters.order}
        >
          {vacanciesSortOptions.map((o) => (
            <FormControlLabel value={o.value} control={<Radio />} label={o.text} key={o.value} />
          ))}
        </RadioGroup>
      </div>
      <RadioGroup
        defaultValue=""
        onChange={(e) => handleChangeFilter(e, "expirience")}
        name="expirience"
        value={filters.expirience}
      >
        {Object.values(EXPIRIENCE_TYPES).map((t) => (
          <FormControlLabel value={t} control={<Radio />} label={t} key={t} />
        ))}
        <FormControlLabel value="" control={<Radio />} label="Любой" />
      </RadioGroup>
      <RadioGroup
        defaultValue=""
        onChange={(e) => handleChangeFilter(e, "format")}
        name="format"
        value={filters.format}
      >
        {Object.values(WORK_FORMATS).map((t) => (
          <FormControlLabel value={t} control={<Radio />} label={t} key={t} />
        ))}
        <FormControlLabel value="" control={<Radio />} label="Любой" />
      </RadioGroup>
    </div>
  );
};

export default Filters;

// import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

// export const useCustomSearchParams = (): [
//   { [k: string]: string },
//   (nextInit: URLSearchParamsInit, navigateOptions?: { replace?: boolean | undefined; state?: any } | undefined) => void,
// ] => {
//   const [search, setSearch] = useSearchParams();
//   const searchAsObject = Object.fromEntries(new URLSearchParams(search));

//   return [searchAsObject, setSearch];
// };
