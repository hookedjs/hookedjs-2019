// Import dependencies
import axios from "axios";


export const Axios = axios.create({
  baseURL: "/api/1.0",
  timeout: 10000,
});

// TODO: Handle timeouts gracefully with an alert or warning of some kind
