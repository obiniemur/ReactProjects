import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const axiosSecure = axios.create({
    baseURL: "https://library-server-gilt.vercel.app",
    withCredentials: true
})
const useAxiosSecure = () => {
    const {signOutUser}= useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            console.log('test from intercep',res)
            return res;
        }, error=>{
            console.log('error tracked in the interceptor', error.response);
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('logout the user')
                signOutUser()
                .then(()=>{
                    navigate('/login')
                })
                .catch(error=>console.log(error))
            }

        })
    },[])
    return axiosSecure;
};

export default useAxiosSecure;