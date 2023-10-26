import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://movie-app-server-1234.onrender.com",
});

export default axiosInstance;
