import React, { useEffect, useRef, useState } from "react";
import ImageFull from "../image_fullscreen/ImageFull";
import SeparateMessage from "./SeparateMessage";

const Message = ({ data }) => {
  const { profile_pic, date, isOwner } = data || {};
  let { message, message_img } = data || {};
  const ref = useRef();
  const [open, setOpen] = useState(false);



  const time = new Date(date.seconds * 1000 + date.nanoseconds / 1e6);
  const localHour = time.getHours();
  const localMinute = time.getMinutes();

  const pattern = /^((http|https|ftp):\/\/)/;
  if(pattern.test(message)) {
    ({ message, message_img } = SeparateMessage(message));
  }

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div ref={ref} className={`message ${isOwner ? "owner" : ""}`}>
      <ImageFull  open={open} url={message_img} onClick={() => setOpen(!open)} />
      <div className="messageInfo">
        <img src={profile_pic || "user_pic_placeholder.png"} alt="profile_pic" />
        <span>{`${localHour}:${localMinute}` || "Just Now"}</span>
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
