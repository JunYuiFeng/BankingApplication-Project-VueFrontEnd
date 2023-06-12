import axios from "axios";
const instance = axios.create({
  baseURL: "https://blossombank-inholland-gr1-2023.onrender.com",
});
export default instance;
/*
import axios from "axios";
import https from "https";

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: "https://localhost:8443",
});

export default instance;*/
