import axios from "axios";

export const client = axios.create({
  baseURL: "http://43.203.90.157:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
