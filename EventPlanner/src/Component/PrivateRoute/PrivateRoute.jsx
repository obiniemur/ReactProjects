import { useContext } from "react";
import { dataProvider } from "../Context/DataContext";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";



const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(dataProvider);
    const location = useLocation()
    if(loading){
        console.log('loading')
    }
    if(!user){
        return <Navigate state={location.pathname} to='/login' />
    }
    return children;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node,
  };