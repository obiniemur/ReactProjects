import axios from "axios";
import {useNavigate} from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://obi-first-restaurant.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {logOut} = useAuth();
  //Request Interceptor to add authorization header for every secure call to API
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log('Request Stopped by interceptor', token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  //Intercept 401 and 403 status

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      // console.log('Status Error from the interceptor response', status);
      //For 401 and 403 status code, logout the user and send him to login page
      if (status === 401 || status === 403) {
        await logOut();

        navigate("/login");
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
