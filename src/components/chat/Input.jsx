import React, { useState } from "react";
import "./ChatComponents.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import { ChatContext } from "../../contexts/ChatContext";
import { ChatPartnerContext } from "../../contexts/ChatPartnerContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [message, setMessage] = useState("")
  const {currentUser} = React.useContext(ChatContext)
  const {data} = React.useContext(ChatPartnerContext)
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  React.useEffect(()=>{
    setMessage("")
},[])
 
  const handleSend = async () => {
    console.log(message)
    await updateDoc(doc(db,"chats",data.chatId),{
      messages: arrayUnion({
        id:uuid(),
        message,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    })
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".userInfo.latest_message"]:message,
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".userInfo.latest_message"]:message,
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setMessage('')
  };
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await handleSend();
    }
  }
  return (
    <div className="input">
      <textarea placeholder="Type a message" value={message}  onChange={handleMessageChange} onKeyDown={handleKeyDown}/> 
      <div className="input_btn">
        <input type="file" id="file" style={{display: 'none'}} />
        <label htmlFor="file">
          <AddCircleOutlineOutlinedIcon className="addIcon" sx={{fontSize: '30px', color: 'white'}}/>
        </label>
        <SendIcon className="sendIcon" sx={{fontSize: '30px', color: 'white'}} onClick={handleSend} />
      </div>
      
    </div>
  );
};

export default Input;
