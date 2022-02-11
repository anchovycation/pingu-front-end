import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_PATH,
});

export default axiosInstance;
