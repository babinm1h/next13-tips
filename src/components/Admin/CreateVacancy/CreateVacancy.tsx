"use client";
import TextField from "@components/UI/InputField/InputField";
import SelectField from "@components/UI/Select/Select";
import { Button, Checkbox, Chip } from "@mui/material";
import { VacanciesApi } from "@src/api/vacanciesApi";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import { useMutation } from "react-query";
import s from "./CreateVacancy.module.scss";
import * as yup from "yup";
import { VALIDATION_MESSAGES } from "@src/constants/validationMessages";
import { EXPIRIENCE_TYPES, WORK_FORMATS } from "@ts/entities";

interface IForm {
  name: string;
  company: string;
  salary: number;
  description: string;
  address: string;
  expirience: EXPIRIENCE_TYPES | "";
  format: WORK_FORMATS | "";
}

const validationSchema = yup.object().shape({
  name: yup.string().min(1).max(200).required(VALIDATION_MESSAGES.REQUIRED),
  company: yup.string().min(1).max(200).required(VALIDATION_MESSAGES.REQUIRED),
  description: yup.string().max(2500).required(VALIDATION_MESSAGES.REQUIRED),
  address: yup.string().min(1).max(300).required(VALIDATION_MESSAGES.REQUIRED),
  salary: yup.number().min(0).required(VALIDATION_MESSAGES.REQUIRED),
  expirience: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  format: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
});

const CreateVacancy = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const createVacancy = useMutation((data: object) => VacanciesApi.create(data));

  const initialValues: IForm = {
    name: "",
    company: "",
    salary: 0,
    description: "",
    address: "",
    expirience: "",
    format: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit(values, helpers) {
      console.log(values);
      createVacancy.mutate({ ...values, crucial_skills: skills });
    },
  });

  const formatOptions = useMemo(() => Object.values(WORK_FORMATS).map((el) => ({ value: el, text: el })), []);
  const expOptions = useMemo(
    () => Object.values(EXPIRIENCE_TYPES).map((el) => ({ value: el, text: el })),
    []
  );

  const onChangeSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
  };

  const onAddSkill = () => {
    if (!skill) return;
    setSkills((prev) => [...prev, skill]);
  };

  return (
    <div className={s.wrapper}>
      <form action="" onSubmit={formik.handleSubmit}>
        <TextField
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={!!formik.errors.name}
          helperText={formik.errors.name}
          label="Заголовок"
        />
        <TextField
          name="address"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={!!formik.errors.address}
          helperText={formik.errors.address}
          label="Адрес"
        />
        <TextField
          name="company"
          onChange={formik.handleChange}
          value={formik.values.company}
          error={!!formik.errors.company}
          helperText={formik.errors.company}
          label="Company"
        />
        <TextField
          name="salary"
          onChange={formik.handleChange}
          value={formik.values.salary}
          error={!!formik.errors.salary}
          helperText={formik.errors.salary}
          type="number"
          label="ЗП"
        />
        <TextField
          multiline
          rows={2}
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={!!formik.errors.description}
          helperText={formik.errors.description}
          label="Описание"
        />
        <SelectField
          options={formatOptions}
          name="format"
          onChange={formik.handleChange}
          value={formik.values.format}
          error={!!formik.errors.format}
          label="Формат работы"
        />
        <SelectField
          options={expOptions}
          name="expirience"
          onChange={formik.handleChange}
          value={formik.values.expirience}
          error={!!formik.errors.expirience}
          label="Опыт работы"
        />
        <TextField name="crucial_skills" onChange={onChangeSkill} value={skill} label="Ключевые навыки" />
        <Button type="button" variant="contained" onClick={onAddSkill}>
          Добавить навык
        </Button>
        <div>
          {skills.map((s) => (
            <Chip variant="filled" label={s} />
          ))}
        </div>

        <Button type="submit" variant="contained" className={s.start}>
          Добавить
        </Button>
      </form>
    </div>
  );
};

export default CreateVacancy;
