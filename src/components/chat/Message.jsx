import React, { useEffect, useRef, useState } from "react";
import ImageFull from "../image_fullscreen/ImageFull";
import { MessageContainer } from "./styled/messageStyled";
import {MessageImg, Img, MessageContent, MessageInfo, Span, Text} from "./styled/messageStyled";

const Message = ({ data }) => {
  const { profile_pic, message, time, message_img, isOwner, message_vid } = data || {};
  const ref = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <MessageContainer ref={ref} owner={isOwner}>
      <ImageFull open={open} url={message_img} onClick={() => setOpen(!open)} />
      <MessageInfo>
      <Img src={profile_pic || "user_pic_placeholder.png"}
          alt="profile_pic"/>
        <Span>{time || "Just Now"}</Span>
      </MessageInfo>
      <MessageContent>
      {message && <Text>{message}</Text>}
        {message_img && (
          <MessageImg src={message_img} alt="msg_pic" onClick={() => setOpen(!open)}/>
        )}
        {/* <video src="https://www.youtube.com/watch?v=ilgjaWU9w70&ab_channel=RadityaDika"></video> */}
      </MessageContent>
    </MessageContainer>
  );
};

export default Message;
