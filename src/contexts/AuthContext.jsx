import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // ✅ Initialize useState before useEffect
  const [loading,setLoading] = useState(false)

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password); // ✅ Return the promise
  }
  function login(email, password){
    return signInWithEmailAndPassword(auth,email,password)
  }
  function logout(){
    return signOut(auth);
  }
  function resetPassword(email){
    return sendPasswordResetEmail(auth,email)
  }
  function updatemail(email){
    return updateEmail(auth,email) 
  }
  function updatepassword(password){
    return updatePassword(auth,password)
  }

  const fetchUserData = async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        return { uid: user.uid, ...userDoc.data() }; // Merge Firestore data
      }
    }
    return user;
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const userData = await fetchUserData(user);
      setCurrentUser(userData);
      setLoading(false)
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    resetPassword,
    updatemail,
    updatepassword,
    signUp,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
