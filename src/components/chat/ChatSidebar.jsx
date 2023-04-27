import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChatComponents.css";
import ChatInfo from "./ChatInfo";
import {
  BackBtn,
  ChatSidebarContainer,
  SidebarBottom,
  SidebarTop,
} from "./styled/chatSidebarStyled";

const ChatSidebar = ({ onClickChat, data, back }) => {
  const navigate = useNavigate();

  return (
    <ChatSidebarContainer back={back}>
      <SidebarTop>
        <ArrowBackIosIcon sx={{cursor: 'pointer'}} />
        <BackBtn onClick={() => navigate("/")}>Back</BackBtn>
      </SidebarTop>
      <SidebarBottom>
        {data?.map((user, idx) => (
          <ChatInfo key={idx} data={user} onClick={() => onClickChat(user)} />
        ))}
      </SidebarBottom>
    </ChatSidebarContainer>
  );
};

export default ChatSidebar;
