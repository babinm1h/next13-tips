import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { VALIDATION_MESSAGES } from "@src/constants/validationMessages";
import { getMaxMessage, getMinMessage } from "@src/helpers/validateHelpers";
import InputField from "@components/UI/InputField/InputField";
import { Button } from "@mui/material";
import Link from "next/link";
import st from "./LoginForm.module.scss";

const LoginForm = () => {
  const initialValues = { email: "", password: "" };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(VALIDATION_MESSAGES.EMAIL)
      .required(VALIDATION_MESSAGES.REQUIRED)
      .min(6, getMinMessage(6))
      .max(50, getMaxMessage(50)),
    password: yup
      .string()
      .required(VALIDATION_MESSAGES.REQUIRED)
      .min(6, getMinMessage(6))
      .max(32, getMaxMessage(32)),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
    },
  });

  return (
    <form className={st.form} onSubmit={formik.handleSubmit} autoComplete="off">
      <InputField
        label="Адрес e-mail"
        placeholder="Адрес e-mail"
        type="email"
        value={formik.values.email}
        error={!!formik.errors.email}
        helperText={formik.errors.email}
        onChange={formik.handleChange}
        name="email"
        required
      />
      <InputField
        label="Пароль"
        placeholder="Пароль"
        type="password"
        value={formik.values.password}
        error={!!formik.errors.password}
        helperText={formik.errors.password}
        onChange={formik.handleChange}
        name="password"
        required
      />
      <div className={st.footer}>
        <Link href="/signup">Создать аккаунт</Link>
        <Button variant="contained" size="small" type="submit">
          Войти
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
