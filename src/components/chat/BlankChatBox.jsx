import React from "react";
import "./ChatComponents.css";
import { BlankChatContainer } from "./styled/chatBoxStyled";
const BlankChatBox = () => {
  return (
    <BlankChatContainer>
      <h1>Start Chatting Now!</h1>
      <img src="app-icon.png" alt="peers" />
    </BlankChatContainer>
  );
};

export default BlankChatBox;
