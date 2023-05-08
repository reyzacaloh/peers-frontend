import React from "react";
import { ChatPartnerReducer, initialState } from "../reducers/ChatPartnerReducer";
import  { ChatContext } from "./ChatContext";

export const ChatPartnerContext = React.createContext();


const ChatPartnerContextProvider = ({ children }) => {
     const {currentUser} =  React.useContext(ChatContext)


    const [state, dispatch] = React.useReducer(ChatPartnerReducer, initialState);

    React.useEffect(() => {
      dispatch({ type: "SET_CURRENT_USER", payload: currentUser });
    }, [currentUser]);
  
    return (
        <ChatPartnerContext.Provider
            value={{data:state,dispatch}}>
            {children}
        </ChatPartnerContext.Provider>
    );
}

export default ChatPartnerContextProvider;
