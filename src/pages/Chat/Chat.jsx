import React, { useState } from 'react';
import "./Chat.css"
import { ChatSidebar, ChatBox } from '../../components/chat';


const Chat = ({data}) => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    
    const handleOnClickChat = (user) => {
        setUser(user);
        setOpen(true);
    }

    const getData = () => 
         [
    {
      profile_pic: "https://photos.hancinema.net/photos/largephoto1636274.jpg",
      username: "Ahn Go Eun",
      latest_message: "Hello, how are you doing?"
    },
    {
      profile_pic: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      latest_message: "Long time no see"
    },
    {
      profile_pic: "",
      username: "",
      latest_message: ""
    },
    {
      profile_pic: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      latest_message: "Long time no see"
    },
    {
      profile_pic: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      latest_message: "Long time no see"
    },
    {
      profile_pic: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      latest_message: "Long time no see"
    },
    {
      profile_pic: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      latest_message: "Long time no see"
    },
    {
      profile_pic: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      latest_message: "Long time no see"
    },
    {
      profile_pic: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      latest_message: "Long time no see"
    },
  ]
    
    return (
        <div className='chat_container'>
            <div className="wrapper">
               <ChatSidebar data={getData()} onClickChat={(e) => handleOnClickChat(e)}/>
               <ChatBox open={open} data={user} onClose={() => setOpen(false)}/>
            </div>
        </div>
    );
};

export default Chat;