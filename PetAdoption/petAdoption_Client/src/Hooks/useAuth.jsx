import { useContext } from "react";
import { authContext } from "../authProvider/AuthProviders";

const useAuth = () => {
    const auth = useContext(authContext)
    
    return auth;
};

export default useAuth;