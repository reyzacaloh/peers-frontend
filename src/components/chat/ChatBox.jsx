import React from "react";
import "./ChatComponents.css";
import BlankChatBox from "./BlankChatBox";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import Input from "./Input";
import Messages from "./Messages";

const ChatBox = ({ data, onClose, open }) => {
  let { profile_pic, username } = data || {};
  return (
    <div className="chat_box">
      {open ? (
        <>
          <div className="chat_box_top">
            <div className="chat_box_header">
              <div className="user_info">
                <div className="profile">
                  <img
                    src={profile_pic || "user_pic_placeholder.png"}
                    alt="profile_picture"
                  />
                  <span>{username || "Unknown"}</span>
                </div>
                <div className="chat_box_header_button_container">
                  <ReportOutlinedIcon
                    sx={{
                      color: "orange",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                  />
                  <span onClick={onClose}>Close</span>
                </div>
              </div>
            </div>
          </div>
          <Messages />
          <Input />
        </>
      ) : (
        <BlankChatBox />
      )}
    </div>
  );
};

export default ChatBox;
