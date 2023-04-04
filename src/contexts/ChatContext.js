import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        setCurrentUser(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    getCurrentUser();
  }, []);
  return (
    <ChatContext.Provider value={{ currentUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
