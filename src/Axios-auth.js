import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:80",
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
