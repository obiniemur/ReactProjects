import {createContext, useEffect, useState} from "react";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {app} from "../Firebase_Asset/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const authContext = createContext(null);
const AuthProviders = ({children}) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const axiosPublic = useAxiosPublic();

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('From auth',currentUser)
      if (currentUser) {
        const userEmail = {email: currentUser.email};
        axiosPublic.post("/jwt", userEmail)
        .then((res)=> {
          console.log("from jwt api call", res.data);
          localStorage.setItem('token', res.data.result)
          setLoading(false);
        });
      } else {
        localStorage.removeItem("token");
        setLoading(false)
      }
    });

    return () => {
      return subscriber();
    };
  }, [axiosPublic]);

  const addPhotoAndNametoFirebaseafterSignup = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {displayName: name, photoURL: photo});
  };

  const dataDistribution = {
    signUp,
    user,
    loading,
    logOut,
    logIn,
    addPhotoAndNametoFirebaseafterSignup,
  };
  return <authContext.Provider value={dataDistribution}>{children}</authContext.Provider>;
};

export default AuthProviders;
