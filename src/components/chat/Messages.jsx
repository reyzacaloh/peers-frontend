import React from "react";
import Message from "./Message";
import { MessageContainer } from "./styled/messagesStyled";

const Messages = () => {
  const getData = () => [
    {
      profile_pic: "https://photos.hancinema.net/photos/largephoto1636274.jpg",
      username: "Ahn Go Eun",
      isOwner: true,
      message_img:
        "https://imgx.parapuan.co/crop/11x0:1249x640/945x630/photo/2022/01/26/kekerasan-pada-perempuan2jpg-20220126042709.jpg",
      message: "Hello, how are you doing? Have you watched this?",
    },
    {
      profile_pic:
        "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      isOwner: false,
      message_img: "",
      message: "Long time no see",
    },
    {
      profile_pic: "https://photos.hancinema.net/photos/largephoto1636274.jpg",
      username: "Ahn Go Eun",
      isOwner: true,
      message_img: "",
      message: "Hello, how are you doing?",
    },
    {
      profile_pic:
        "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      isOwner: false,
      message_img: "",
      message: "Long time no see",
    },
    {
      profile_pic: "https://photos.hancinema.net/photos/largephoto1636274.jpg",
      username: "Ahn Go Eun",
      isOwner: true,
      message_img: "",
      message: "Hello, how are you doing?",
    },
    {
      profile_pic: "https://photos.hancinema.net/photos/largephoto1636274.jpg",
      username: "Ahn Go Eun",
      isOwner: true,
      message_img: "",
      message: "Hello, how are you doing?",
    },
    {
      profile_pic:
        "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      isOwner: false,
      message_img: "",
      message: "Long time no see",
    },
    {
      profile_pic: "https://photos.hancinema.net/photos/largephoto1636274.jpg",
      username: "Ahn Go Eun",
      isOwner: true,
      message_img: "",
      message: "Hello, how are you doing?",
    },
    {
      profile_pic: "https://photos.hancinema.net/photos/largephoto1636274.jpg",
      username: "Ahn Go Eun",
      isOwner: true,
      message_img:
        "https://www.viu.com/ott/id/articles/wp-content/uploads/2023/03/preview-taxi-driver-2-episode-6-sub-indo-viu.jpg",
      message: "Hello, how are you doing?",
    },
    {
      profile_pic: "https://photos.hancinema.net/photos/largephoto1636274.jpg",
      username: "Ahn Go Eun",
      isOwner: true,
      message_img:
        "https://jabarekspres.com/wp-content/uploads/2023/02/TX2.png",
      message: "I wish you all the best",
    },
  ];
  return (
    <MessageContainer data-testid="messages">
      {getData()?.map((msg, idx) => (
        <Message data={msg} key={idx} />
      ))}
    </MessageContainer>
  );
};

export default Messages;
