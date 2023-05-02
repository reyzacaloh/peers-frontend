/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";
import ChatContextProvider from "./contexts/ChatContext";
import ChatPartnerContextProvider from "./contexts/ChatPartnerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <ChatPartnerContextProvider>
        <App />
        </ChatPartnerContextProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
