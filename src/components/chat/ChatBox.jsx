import React from "react";
import "./ChatComponents.css";
import BlankChatBox from "./BlankChatBox";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import Input from "./Input";
import Messages from "./Messages";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";
const ChatBox = ({ data, onClose, onClickBack, open, back }) => {
  let { profile_pic, username } = data || {};
  const isMobile = useBreakpoint(down("md"));
  return (
    <div className={`chat_box ${back ? "hidden" : ""}`}>
      {open || isMobile? (
        <>
          <div className="chat_box_top">
            <div className="chat_box_header">
              <div className="user_info">
              <div className="user_info_profile">
              <ArrowBackIosIcon className="back_btn" onClick={onClickBack}/>
                <div className="profile">
                  <img
                    src={profile_pic || "user_pic_placeholder.png"}
                    alt="profile_picture"
                  />
                  <span>{username || "Unknown"}</span>
              </div>
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
