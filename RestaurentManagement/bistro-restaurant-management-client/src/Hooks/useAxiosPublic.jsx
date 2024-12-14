import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://obi-first-restaurant.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
