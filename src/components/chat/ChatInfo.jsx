import React from "react";
import {
  ChatInfoContainer,
  ChatInfoStyled,
  ImgContainer,
  Img,
  UserChatInfo,
  ChatInfoHeader,
  Username,
  Time,
  LatestMessage,
} from "./styled/chatInfoStyled";

const ChatInfo = ({ onClick, data }) => {
  let { profile_pic, username, latest_message, time } = data || {};
  return (
    <ChatInfoContainer onClick={onClick} data-testid="chat_info_container">
      <ChatInfoStyled>
        <ImgContainer>
          <Img
            src={profile_pic || "user_pic_placeholder.png"}
            alt="profile_picture"
          />
        </ImgContainer>
      </ChatInfoStyled>
      <UserChatInfo>
        <ChatInfoHeader>
          <Username>{username || "Unknown"}</Username>
          <Time>{time || "13.00"}</Time>
        </ChatInfoHeader>
        <LatestMessage>{latest_message || ""}</LatestMessage>
      </UserChatInfo>
    </ChatInfoContainer>
  );
};

export default ChatInfo;
