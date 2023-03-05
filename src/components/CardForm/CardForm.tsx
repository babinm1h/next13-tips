"use client";
import InputField from "@components/UI/InputField/InputField";
import { Button } from "@mui/material";
import { BANK_ACCOUNT_PATTERN, BIC_PATTERN, getCardType, getMaxMessage } from "@src/helpers/validateHelpers";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  bank_account: yup.string().matches(BANK_ACCOUNT_PATTERN, "Неверный номер счета").max(20, getMaxMessage(20)),
  bank_bic: yup.string().matches(BIC_PATTERN, "Неверный БИК").max(9, getMaxMessage(9)),
  card_number: yup
    .string()
    // .matches(BANK_ACCOUNT_PATTERN, "Неверный номер карты")
    .max(20, getMaxMessage(20)),
});

const initialValues = {
  bank_bic: "",
  bank_account: "",
  card_number: "",
};
console.log(getCardType('2202202528300225'))
const CardForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit(values, formikHelpers) {
      console.log(getCardType(values.card_number.replace(/ /g, "")));
      console.log(values);
    },
  });

  return (
    <div>
      <form action="" onSubmit={formik.handleSubmit}>
        <InputField
          value={formik.values.bank_account}
          name="bank_account"
          helperText={formik.errors.bank_account}
          error={!!formik.errors.bank_account}
          onChange={formik.handleChange}
          label="bank account"
        />
        <InputField
          value={formik.values.bank_bic}
          name="bank_bic"
          helperText={formik.errors.bank_bic}
          error={!!formik.errors.bank_bic}
          onChange={formik.handleChange}
          label="bank bic"
        />
        <InputField
          value={formik.values.card_number}
          name="card_number"
          helperText={formik.errors.card_number}
          error={!!formik.errors.card_number}
          onChange={formik.handleChange}
          label="card number"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CardForm;
