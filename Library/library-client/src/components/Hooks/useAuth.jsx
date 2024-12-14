import  { useContext } from 'react';
import { dataContext } from '../AuthProvider/ContextProvider';

const useAuth = () => {
    const auth = useContext(dataContext)
    return auth;
};

export default useAuth;