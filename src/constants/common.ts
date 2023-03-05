export const API_URL = process.env.API_URL || "http://localhost:7777";

export const vacanciesSortOptions = [
  { text: "Умолчанию", value: "" },
  { text: "Убыванию Дохода", value: "salaryDesc" },
  { text: "Возростанию дохода", value: "salaryAsc" },
  { text: "Дате", value: "byDate" },
];
