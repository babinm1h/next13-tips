import { API_URL } from "@src/constants/common";
import axios from "axios";

export const $instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
