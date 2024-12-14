import {useContext} from "react";
import {dataContext} from "../Authprovider/ContextProvider";
import {Navigate, useLocation} from "react-router-dom";

const PrivateRoute = ({children}) => {
  const {user, loading} = useContext(dataContext);
  const location = useLocation();
  if (loading) {
    <span className="loading loading-ring loading-lg"></span>;
  }

  if(!user){
    
    return <Navigate state={location.pathname} to='/signin'/>
  }


  return children;
};

export default PrivateRoute;
