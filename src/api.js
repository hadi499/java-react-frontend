import axios from "axios";

const instance = axios.create({
  baseUrl: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
