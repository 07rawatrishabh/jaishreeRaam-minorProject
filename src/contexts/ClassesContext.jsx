// ClassContext.js
import React from "react";
import { getFirestore, getDocs, collection, where, query } from "firebase/firestore"; // Import where and query from Firestore
import { getUserToken } from "../utils/sessionStorage/sessionStorage";
const ClassContext = React.createContext();
const userToken = getUserToken();
export const useClassContext = () => React.useContext(ClassContext);

export const ClassProvider = ({ children }) => {
  const db = getFirestore();
  const [classes, setClasses] = React.useState([]);

  const updateClasses = async () => {
    try {
      
      const Query = query(collection(db, "classes"), where("enrolledUsers", "array-contains", userToken));
      const classSnapshot = await getDocs(Query);
      const classData = classSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setClasses(classData);
    } catch (error) {
      console.error("Error updating classes:", error);
    }
  };
  return (
    <ClassContext.Provider value={{ classes, updateClasses, setClasses }}>
      {children}
    </ClassContext.Provider>
  );
};
