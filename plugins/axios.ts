import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (!req.headers) return req;
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

api.interceptors.response.use(
  (res) => {
    if (res.config.baseURL) console.log(res.config.baseURL + res.config.url, res);
    return res;
  },
  (err) => {
    if (axios.isCancel(err)) console.error("リクエストがキャンセルされました");
    else console.error(err.response);
    throw err;
  }
);
