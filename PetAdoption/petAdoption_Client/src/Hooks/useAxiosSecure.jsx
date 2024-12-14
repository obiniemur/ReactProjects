import axios from "axios";
import {useNavigate} from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://pet-adoption-server-six.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();

  //Request Interceptor to add authorization header for every secure call to API
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        await logout();
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
