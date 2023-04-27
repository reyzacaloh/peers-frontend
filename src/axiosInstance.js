/* istanbul ignore file */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const accessToken = JSON.parse(localStorage.getItem("token"));

const TOKEN = accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { authorization: `Bearer ${TOKEN}` },
});
