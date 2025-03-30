import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";
import { doc, getDoc,setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, linkWithCredential, EmailAuthProvider } from "firebase/auth";

const AuthContext = React.createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  
  const [currentUser, setCurrentUser] = useState(null); // ✅ Initialize useState before useEffect
  const [loading,setLoading] = useState(true)
  const [profileCompleted, setProfileCompleted] = useState(false);

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
  function updatepassword(password){
    return updatePassword(auth,password)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          profileCompleted: false, // Force settings page after login
        });
      }

      return user; 
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      return null;
    }
  };
  const setPasswordForGoogleUser = async (email, password) => {
    if (!currentUser) return false;

    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(user, credential)
      .then((usercred) => {
        const user = usercred.user;
        console.log("Account linking success", user);
        return true;
      }).catch((error) => {
        console.log("Account linking error", error);
        return false;
      });;
      // await updatePassword(currentUser, password);

      console.log("Password set successfully");
      return true;
    } catch (error) {
      console.error("Error linking password:", error.message);
      return false;
    }
  };


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
      if (userData){
        setProfileCompleted(userData.profileCompleted || false);
      }
      setLoading(false)
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    profileCompleted,
    login,
    logout,
    resetPassword,
    updatepassword,
    signUp,
    signInWithGoogle,
    setPasswordForGoogleUser,
    setProfileCompleted,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
