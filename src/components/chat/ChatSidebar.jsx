import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChatComponents.css";
import ChatInfo from "./ChatInfo";

const ChatSidebar = ({onClickChat, data, back}) => {
  const navigate = useNavigate();
 
  return (
    <div className={`chat_sidebar ${back ? "" : "hidden"}`} data-testid="chat_sidebar">
      <div className="sidebar_top">
        <ArrowBackIosIcon className="arrow" />
        <span onClick={() => navigate("/")}>Back</span>
      </div>
      <div className="sidebar_bottom">
        {data?.map((user, idx) => (
          <ChatInfo key={idx} data={user}  onClick={() => onClickChat(user)}/>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
