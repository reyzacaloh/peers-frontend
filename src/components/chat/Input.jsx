import React, { useState } from "react";
import "./ChatComponents.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import { ChatContext } from "../../contexts/ChatContext";
import { ChatPartnerContext } from "../../contexts/ChatPartnerContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { storage, db } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import axios from "axios";

const Input = () => {
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(true);
  const { currentUser } = React.useContext(ChatContext);
  const { data } = React.useContext(ChatPartnerContext);
  const [fileUpload, setFileUpload] = useState(null);
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  React.useEffect(() => {
    setMessage("");
    setDisable(true)
    const getBookData = async (endpoint) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}${endpoint}`,
          {
            headers: {
              authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        const bookList = response.data.booking_list;
        bookList.forEach((element) => {
          if (element.uid === data.user.uid) {
            const current_time = new Date();
            const schedule_time = new Date(element.schedule);
            const schedule_time_end = new Date(schedule_time);
            schedule_time_end.setHours(schedule_time.getHours() + 1);

            if (current_time >= schedule_time && current_time <= schedule_time_end) {
              setDisable(false);
              let time_remaining =schedule_time_end.getTime() - current_time.getTime();
              setTimeout(() => setDisable(true), time_remaining);
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.role === 2){
      getBookData("/api/booking/tutor-paid-list")
    } else if (currentUser.role === 3){
      getBookData("/api/booking/booking-paid");
    }
  }, [currentUser.role, data]);

  const handleUpload = () => {
    const fileRef = ref(storage, `files/${data.chatId}/${fileUpload.name}`);
    try {
      uploadBytes(fileRef, fileUpload).then(() => {
        console.log("File uploaded")
      });
      return `https://storage.googleapis.com/peers-staging-9d8ed.appspot.com/files/${data.chatId}/${fileUpload.name}`;
    } catch (e) {
      console.log(e);
    }
  };
  const handleSend = async () => {
    if (!disable){
      let fileUrl = "";
    if (fileUpload != null) {
      fileUrl = `${handleUpload()}|`;
    }

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
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

    setMessage("");
    setFileUpload(null);
    }
  };
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await handleSend();
    }
  };
  return (
    <div className="input">
      <textarea
        disabled={disable}
        placeholder="Type a message"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
      />
      <div className="input_btn">
        <input
          disabled={disable}
          type="file"
          id="file"
          data-testid="input"
          onChange={(event) => {
            setFileUpload(event.target.files[0]);
          }}
          style={{ display: "none" }}
        />
        <label htmlFor="file">
          <AddCircleOutlineOutlinedIcon
            className="addIcon"
            sx={{ fontSize: "30px", color: "white" }}
          />
        </label>
        <SendIcon
          className="sendIcon"
          sx={{ fontSize: "30px", color: "white" }}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default Input;
