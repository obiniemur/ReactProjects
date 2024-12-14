import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation();
    if(loading){
        return <div className="text-center text-9xl"><span className="loading loading-dots loading-lg"></span></div>
    }

    if(user){
        return children;
    }
    return <Navigate to='/'  state={{from: location}} replace />
};

export default PrivateRoute;