import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getUserToken } from "../../utils/sessionStorage/sessionStorage";

const ClassRoom = () => {
  const { id } = useParams(); // Get the class ID from URL parameters
  const [className, setClassName] = useState(""); // State to store the class name
  const [isCreator, setIsCreator] = useState(false); // State to track if the current user is the creator
  const [announcementText, setAnnouncementText] = useState(""); // State to store the announcement text
  const [announcements, setAnnouncements] = useState([]); // State to store announcements
  const userToken = getUserToken(); // Get the user token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const classRef = doc(db, "classes", id);
        const classSnap = await getDoc(classRef);
        if (classSnap.exists()) {
          const classData = classSnap.data();
          setClassName(classData.name); // Set the class name in the state
          setIsCreator(classData.creatorUid === userToken); // Check if the user is the creator
          setAnnouncements(classData.announcements || []); // Set announcements from Firestore
        } else {
          console.log("Class not found");
        }
      } catch (error) {
        console.error("Error fetching class:", error);
      }
    };

    fetchData();
  }, [id, userToken]);

  const handleAnnouncement = async () => {
    try {
      const db = getFirestore();
      const classRef = doc(db, "classes", id);
      await updateDoc(classRef, {
        announcements: arrayUnion(announcementText) // Add announcement to the array in Firestore
      });
      console.log("Announcement posted successfully");
      setAnnouncementText(""); // Clear the announcement text after posting
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Class: {className}</h1>
      
      {/* Display announcement section only if the user is the creator */}
      {isCreator && (
        <div className="mb-4">
          {/* Announcement input form */}
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 mr-2 w-3/4"
            placeholder="Enter announcement"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAnnouncement}
          >
            Post Announcement
          </button>
        </div>
      )}

      {/* Display chat box for the user */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Chat Box</h2>
        <ul>
          {announcements.map((announcement, index) => (
            <li key={index} className="border-b border-gray-300 py-2">{announcement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassRoom;
