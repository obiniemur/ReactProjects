import PropTypes from "prop-types";
import {createContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

export const dataProvider = createContext(null);
const DataContext = ({children}) => {
  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false)
    });

    return () => {
      subscribe();
    };
  }, []);

  const signUpMethod = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInMethod = (email, password) => {
    setLoading(true)

    return signInWithEmailAndPassword(auth, email, password);
  };

  const googlSign = () =>{
    return signInWithPopup(auth, provider)
  }

  const signOutMethod = () => {
    setLoading(true)

   return signOut(auth)
  };

  const transfer = {
    data,
    reviews,
    signUpMethod,
    signInMethod,
    user,
    signOutMethod,
    loading,
    googlSign
  };

  return <dataProvider.Provider value={transfer}>{children}</dataProvider.Provider>;
};

export default DataContext;

DataContext.propTypes = {
  children: PropTypes.node,
};
