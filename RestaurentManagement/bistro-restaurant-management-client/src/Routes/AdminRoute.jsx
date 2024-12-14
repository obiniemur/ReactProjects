import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";


const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const {user, loading} = useAuth();
    const location = useLocation()
    if(loading || isAdminLoading){
        return <div className="text-center text-9xl"><span className="loading loading-dots loading-lg"></span></div>
    }

    if(user && isAdmin){
        return children;
    }

    
    return <Navigate  to="/" state={{from: location}} replace ></Navigate>
};

export default AdminRoute;