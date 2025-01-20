import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.ini";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   login in to site
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // register to site
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signout
  const signout = () => {
    return signOut(auth);
  };

  // google login

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // manage profile image and name
  const updateUser = (name, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.photoURL) {
        setUser(currentUser);
        const userInfo = currentUser?.email;
        axios.post(`${import.meta.env.VITE_DB}/jwt`, userInfo).then((res) => {
          if (res?.data?.token) {
            localStorage.setItem("token", res?.data?.token);
          }
        });
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const authInfo = {
    login,
    register,
    updateUser,
    googleLogin,
    user,
    loading,
    signout,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
