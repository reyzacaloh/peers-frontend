import React from 'react'
import "./ChatComponents.css"
const BlankChatBox = () => {
  return (
    <div className="blank_chat_container" data-testid="blank-chat-container">
      <h1>Start Chatting Now!</h1>
      <img src='app-icon.png' alt='peers'/>
    </div>
  )
}

export default BlankChatBox