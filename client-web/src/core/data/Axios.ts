// Import dependencies
import axios from "axios";


export const Axios = axios.create({
  baseURL: "/api/1.0",
  timeout: 1000,
});
