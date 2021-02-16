import { createContext, useEffect, useState } from "react";
import firebase from "./firebase";
import "firebase/auth";

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    pending: true,
    isSignedIn: false,
  });

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      setAuthState({ user, pending: false, isSignedIn: !!user });
    });

    return () => authListener();
  }, []);

  const onSignIn = () => {
    auth.signInWithPopup(googleProvider);
  };

  const onLogout = () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ authState, onLogout, onSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
