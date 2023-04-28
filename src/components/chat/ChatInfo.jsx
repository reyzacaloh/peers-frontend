import React from "react";
import "./ChatComponents.css";
const ChatInfo = ({ onClick, data }) => {
  let { profile_pic, username, latest_message, time } = data || {};
  return (
    <div className="chat_info_container" onClick={onClick} data-testid="chat_info_container">
      <div className="chat_info">
        <div className="user_profile_pic">
          <img src={profile_pic || "user_pic_placeholder.png"} alt="profile_picture" />
        </div>
        <div className="user_chat_info">
          <div className="chat_header_info">
            <span>{username || "Unknown"}</span>
            <p>{time || "13.00"}</p>
          </div>
          <p>{latest_message || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
