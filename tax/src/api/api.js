import axios from "axios";

const baseURL = "http://localhost:8080/wsTax/ws/rest/request/";

const defaultOptions = {
  baseURL,
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
   // "Access-Control-Allow-Origin":"*",
  },
};

const api = axios.create(defaultOptions);
export default api;