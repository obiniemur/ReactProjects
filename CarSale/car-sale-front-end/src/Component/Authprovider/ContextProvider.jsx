import { createContext, useEffect, useState } from "react";
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "./firebase.config";

export const dataContext = createContext(null)
const ContextProvider = ({children}) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true)



    useEffect(()=>{
        const subscribe = onAuthStateChanged(auth, (user)=>{
            setUser(user)
            setLoading(false)
        })

        return ()=> subscribe();
    },[])



    const signupUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signinUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = ()=>{
        setLoading(true)
        return signOut(auth)
    }

   




    const transfer = {signupUser,signinUser,user,signOutUser,loading}
    return (
        <dataContext.Provider value={transfer}>
            {children}
        </dataContext.Provider>
    );
};

export default ContextProvider;