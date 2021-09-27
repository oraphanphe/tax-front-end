import axios from "axios";


// const baseURL = "http://localhost:8080/wsLicenseAgentSpring/licenseexam/";
const baseURL = "http://localhost:8061/tax/";
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
console.log("result in fetchData spring defaultOptions.method >>>>>>>>>>>>>."+defaultOptions.method);
console.log("result in fetchData spring defaultOptions.baseURL >>>>>>>>>>>>>."+defaultOptions.baseURL);
console.log("result in fetchData spring api >>>>>>>>>>>>>."+api);
console.log("result in fetchData spring baseURL >>>>>>>>>>>>>."+baseURL);
export default api;