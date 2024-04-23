// AnnouncementContext.jsx
import React from "react";

// Create the context
const AnnouncementContext = React.createContext();

// Custom hook to use the context
export const useAnnouncementContext = () => React.useContext(AnnouncementContext);

// Context provider component
export const AnnouncementProvider = ({ children }) => {
  const [announcements, setAnnouncements] = React.useState([]);

  const refreshAnnouncements = (newAnnouncements) => {
    setAnnouncements(newAnnouncements);
    console.log('bhadwerefresh hoja');
  };

  return (
    <AnnouncementContext.Provider value={{ announcements, refreshAnnouncements }}>
      {children}
    </AnnouncementContext.Provider>
  );
};
