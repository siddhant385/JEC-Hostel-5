import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase"; // Adjust based on your project structure
import { collection, getDocs } from "firebase/firestore";

// Create Context
const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}


// Provider Component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Fetch user data from Firestore
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: `${doc.data().firstName} ${doc.data().lastName}`, // Combine first and last name
        branch: doc.data().branch,
        from: doc.data().from,
        profilePic:doc.data().profilePic,
        contactNo: doc.data().contactNo,
      }));
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
