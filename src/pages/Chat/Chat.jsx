import React, { useState,useEffect } from 'react';
import "./Chat.css"
import { ChatSidebar, ChatBox } from '../../components/chat';
import {ChatContext} from "../../contexts/ChatContext"
import {ChatPartnerContext} from "../../contexts/ChatPartnerContext"
import {doc,onSnapshot} from "firebase/firestore"
import {db} from "../../firebase"

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    const [back, setBack] = useState(true);

    const [chats, setChats] = useState([]);
    const {currentUser} = React.useContext(ChatContext);
    const {dispatch} = React.useContext(ChatPartnerContext);

    useEffect(() => {
      const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });
  
        return () => {
          unsub();
        };
      };
  
      currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleData=  (chats) =>{
      const sortedChat = Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date)
      const chatData = sortedChat.map(map => map[1].userInfo)
      return chatData
    }
    
    
    const handleOnClickChat = (partner) => {
       
      dispatch({type:"CHANGE_USER",payload:partner})
      setUser(partner);
      setOpen(true);
      setBack(false) 
  }
   
    
    return (
        <div className='chat_container'>
            <div className="wrapper">
               <ChatSidebar back={back} data={handleData(chats)} onClickChat={(e) => handleOnClickChat(e)}/>
               <ChatBox back={back} open={open} data={user} onClickBack={() => setBack(true)} onClose={() => setOpen(false)}/>
            </div>
        </div>
    );
};

export default Chat;

