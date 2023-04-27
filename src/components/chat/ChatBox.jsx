import React from "react";
import "./ChatComponents.css";
import BlankChatBox from "./BlankChatBox";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import Input from "./Input";
import Messages from "./Messages";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";
import {
  ChatBoxContainer,
  ChatBoxHeader,
  ChatBoxTop,
  CloseBtn,
  Img,
  Profile,
  ReportBtnContainer,
  UserInfo,
  UserInfoProfile,
  Username,
} from "./styled/chatBoxStyled";

const ChatBox = ({ data, onClose, onClickBack, open, back }) => {
  let { profile_pic, username } = data || {};
  const isMobile = useBreakpoint(down("md"));
  
  return (
    <ChatBoxContainer back={back}>
      {open || isMobile ? (
        <>
          <ChatBoxTop>
            <ChatBoxHeader>
              <UserInfo>
                <UserInfoProfile>
                 {isMobile && <ArrowBackIosIcon
                    className="back_btn"
                    onClick={onClickBack}
                  />}
                  <Profile>
                    <Img
                      src={profile_pic || "user_pic_placeholder.png"}
                      alt="profile_picture"
                    />
                    <Username>{username || "Unknown"}</Username>
                  </Profile>
                </UserInfoProfile>
              </UserInfo>
              <ReportBtnContainer>
                <ReportOutlinedIcon
                  sx={{
                    color: "orange",
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                />
                <CloseBtn data-testid="close_btn" onClick={onClose}>
                  Close
                </CloseBtn>
              </ReportBtnContainer>
            </ChatBoxHeader>
          </ChatBoxTop>
          <Messages />
          <Input  />
        </>
      ) : (
        <BlankChatBox />
      )}
    </ChatBoxContainer>
  );
};

export default ChatBox;
