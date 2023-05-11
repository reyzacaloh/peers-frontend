import axios from "axios";
import React, { useEffect, useState, createContext, useReducer } from "react";
import { authReducer, initialState } from "../reducers/AuthReducer";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const[state, dispatch] = useReducer(authReducer, initialState);

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
        dispatch({type: "LOGOUT", payload: {...state}});
      }
    };
    getCurrentUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ChatContext.Provider value={{ currentUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
