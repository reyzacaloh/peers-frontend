import React, { useEffect, useRef, useState } from "react";
import ImageFull from "../image_fullscreen/ImageFull";

const Message = ({ data }) => {
  const { profile_pic, message, time, message_img, isOwner } = data || {};
  const ref = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div ref={ref} className={`message ${isOwner ? "owner" : ""}`}>
      <ImageFull  open={open} url={message_img} onClick={() => setOpen(!open)} />
      <div className="messageInfo">
        <img src={profile_pic || "user_pic_placeholder.png"} alt="profile_pic" />
        <span>{time || "Just Now"}</span>
      </div>
      <div className="messageContent">
        {message && <p data-testid="message_text">{message}</p>}
        {message_img && (
          <img  src={message_img} alt="msg_pic" onClick={() => setOpen(!open)} />
        )}
      </div>
    </div>
  );
};

export default Message;
