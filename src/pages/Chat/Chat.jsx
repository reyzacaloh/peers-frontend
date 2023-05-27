import React, { useState, useEffect,useRef } from "react";
import "./Chat.css";
import { ChatSidebar, ChatBox } from "../../components/chat";
import { ChatContext } from "../../contexts/ChatContext";
import { ChatPartnerContext } from "../../contexts/ChatPartnerContext";
import {
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import { notification } from "antd";


const Chat = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [back, setBack] = useState(true);

  const [chats, setChats] = useState([]);
  const { currentUser } = React.useContext(ChatContext);
  const { dispatch } = React.useContext(ChatPartnerContext);
  const [api, contextHolder] = notification.useNotification();
  const showErrorRef = useRef(false);
  useEffect(() => {
    showErrorRef.current = false;
    const handlePromiseRejection = (event) => {
      console.log("Uncaught Promise Rejection:", event.reason);
      if(!showErrorRef.current){
        showError()
        showErrorRef.current = true;
        setTimeout(() => window.location.reload(), 2000);
        
      }
    };

    window.addEventListener("unhandledrejection", handlePromiseRejection);

    const showError = () => {
      api.error({
        message: 'Koneksi Gagal',
        description:
          'Mohon refresh halaman anda',
        placement: 'top',
      });
  };


    const getChats = async () => {
      try {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser.uid),
          (dok) => {
            if (dok.exists()) {
              setChats(dok.data());
            } else {
              console.log("No chats data available.");
            }
          }
        );

        return () => {
          unsub();
        };
      } catch (error) {
        console.log("Error getting chats:", error);
      }
    };
    const getContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/booking/booking-paid`,
          {
            headers: {
              authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );

        const learner_check = await getDoc(
          doc(db, "userChats", currentUser.uid)
        );
        if (!learner_check.exists()) {
          await setDoc(doc(db, "userChats", currentUser.uid), {});
        }
        

        const book_list = response.data.booking_list;
        book_list.forEach(async (item) => {
          const combinedId =
            currentUser.uid > item.uid
              ? currentUser.uid + item.uid
              : item.uid + currentUser.uid;
          
          

          const tutor_check = await getDoc(
            doc(db, "userChats", item.uid)
          );
          if (!tutor_check.exists()) {
            await setDoc(doc(db, "userChats", item.uid), {});
          }

          const res = await getDoc(doc(db, "chats", combinedId));

          if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] });

            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [combinedId + ".userInfo"]: {
                latest_message: "",
                profile_pic: item.profile_pic,
                uid: item.uid,
                username: item.tutor_name,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", item.uid), {
              [combinedId + ".userInfo"]: {
                latest_message: "",
                profile_pic: currentUser.profile_picture,
                uid: currentUser.uid,
                username: currentUser.first_name + " " + currentUser.last_name,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        });
      } catch (err) {
        console.log(err)
        if(!showErrorRef.current){
          showError()
          showErrorRef.current = true;
          setTimeout(() => window.location.reload(), 2000);
          
        }
      }
    };
    getContacts();
    currentUser.uid && getChats();
    return () => {
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleData = (allChat) => {
    try {
      const sortedChat = Object.entries(allChat)?.sort(
        (a, b) => b[1].date - a[1].date
      );
      return sortedChat.map((map) => map[1].userInfo);
    } catch (error) {
      return [];
    }
  };

  const handleOnClickChat = (partner) => {
    dispatch({ type: "CHANGE_USER", payload: partner });
    setUser(partner);
    setOpen(true);
    setBack(false);
  };

  return (
    <div className="chat_container">
      {contextHolder}
      <div className="wrapper">
        <ChatSidebar
          back={back}
          data={handleData(chats)}
          onClickChat={(e) => handleOnClickChat(e)}
        />
        <ChatBox
          back={back}
          open={open}
          data={user}
          onClickBack={() => setBack(true)}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default Chat;
