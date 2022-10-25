import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import App from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(App);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  // login and continue from exact page without going back to homepage - step 3
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    // login and continue from exact page without going back to homepage - step 9(set for creating user)
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    // login and continue from exact page without going back to homepage - step 8
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    // login and continue from exact page without going back to homepage - step 10
    setLoading(true);

    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Current user inside', currentUser);
      setUser(currentUser);
      // login and continue from exact page without going back to homepage - step 4
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  // login and continue from exact page without going back to homepage - step 5 (send the loading state) (step-6 in private route)
  const authInfo = { user, loading, createUser, signIn, logOut };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
