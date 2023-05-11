import React, { useState } from "react";
import "./ChatComponents.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import { ChatContext } from "../../contexts/ChatContext";
import { ChatPartnerContext } from "../../contexts/ChatPartnerContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [message, setMessage] = useState("")
  const {currentUser} = React.useContext(ChatContext)
  const {data} = React.useContext(ChatPartnerContext)
  const [fileUpload, setFileUpload] = useState(null);
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  React.useEffect(()=>{
    setMessage("")
},[]);

  const handleUpload = () => {
    const fileRef = ref(storage, `files/${data.chatId}/${fileUpload.name}`);
    try {
      uploadBytes(fileRef, fileUpload).then(() => {
        console.log("File uploaded");
      });
      return `https://storage.googleapis.com/peers-staging-9d8ed.appspot.com/files/${data.chatId}/${fileUpload.name}`;
    } catch (e) {
      console.log(e);
    }
  };
 
  const handleSend = async () => {

    let fileUrl = "";
    if (fileUpload != null) {
      fileUrl = `${handleUpload()} `;
    }

    console.log(fileUrl + message)
    await updateDoc(doc(db,"chats",data.chatId),{
      messages: arrayUnion({
        id:uuid(),
        message: fileUrl + message,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    let filePrev = "";
    if (fileUrl !== "") {
      filePrev = `[${fileUpload.name}] `;
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".userInfo.latest_message"]: filePrev + message,
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".userInfo.latest_message"]: filePrev + message,
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setMessage('');
    setFileUpload(null);
  };
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await handleSend();
    }
  };
  return (
    <div className="input">
      <textarea placeholder="Type a message" value={message}  onChange={handleMessageChange} onKeyDown={handleKeyDown}/> 
      <div className="input_btn">
        <input type="file" id="file" data-testid="input"
               onChange={(event) => {setFileUpload(event.target.files[0]);}}
               style={{display: 'none'}}
        />
        <label htmlFor="file">
          <AddCircleOutlineOutlinedIcon className="addIcon" sx={{fontSize: '30px', color: 'white'}}/>
        </label>
        <SendIcon className="sendIcon" sx={{fontSize: '30px', color: 'white'}} onClick={handleSend} />
      </div>
    </div>
  );
};

export default Input;
