import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.ini";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  //   login in to site
  const login = (email, password) => {
    useState(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // register to site
  const register = (email, password) => {
    useState(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // google login

  const googleLogin = () => {
    useState(true);
    return signInWithPopup(auth, googleProvider);
  };

  // manage profile image and name
  const updateUser = (name, image) => {
    useState(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const authInfo = { login, register, updateUser, googleLogin };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
