import React from "react";
import Message from "./Message";
import { ChatPartnerContext } from "../../contexts/ChatPartnerContext";
import { doc,onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../../contexts/ChatContext";

const Messages = () => {
    const [messages, setMessages] = React.useState([])
    const { currentUser } = React.useContext(ChatContext);
    const {data} = React.useContext(ChatPartnerContext)
    React.useEffect (()=>{
      if(data.chatId != null){
        const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
          doc.exists() && setMessages(doc.data().messages)
        })
        
        return () =>{
          unSub()
        }
      }
    },[data.chatId])
    
    const handleMessages= (messages,user, partner)=>{
      const updatedMessages = messages.map(message => ({
        ...message,
        isOwner: message.senderId === user.uid,
        profile_pic: message.senderId === user.uid ? user.profile_picture : partner.profile_pic
      }));
      return updatedMessages
    }
    
  return (
    <div className="messages" data-testid="messages">
      {handleMessages(messages,currentUser,data.user)?.map((msg, idx) => (
        <Message data={msg} key={idx}/>
      ))}
    </div>
  );
};

export default Messages;
