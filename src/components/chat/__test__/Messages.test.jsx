import React from "react";
import { render, screen } from "@testing-library/react";
import Messages from "../Messages";
import AuthContextProvider from "../../../contexts/AuthContext";
import { ChatPartnerContext } from "../../../contexts/ChatPartnerContext";
import { ChatContext } from "../../../contexts/ChatContext";


describe("Messages component", () => {
  test("should render messages", async () => {
    const messages = [
      {
        id: "msg1",
        text: "Hello",
        senderId: "user1",
        profile_pic: "/path/to/user1/avatar.jpg",
        isOwner: true,
      },
      {
        id: "msg2",
        text: "Hi there",
        senderId: "user2",
        profile_pic: "/path/to/user2/avatar.jpg",
        isOwner: false,
      },
    ];
    const currentUser = {
      uid: "user1",
      profile_picture: "/path/to/user1/avatar.jpg",
    };
    const user = {
      uid: "user2",
      profile_pic: "/path/to/user2/avatar.jpg",
    };
    const chatId = "chat1";
    const userContextValue = {
      currentUser,
    };
    const chatPartnerContextValue = {
      data: {
        user,
        chatId,
      },
    };
    jest.mock("../../../firebase");
    jest.mock("firebase/firestore", () => ({
      doc: jest.fn(),
      onSnapshot: jest.fn((doc, callback) => {
        const snapshot = {
          exists: () => true,
          data: () => ({ messages }),
        };
        callback(snapshot);
        return jest.fn();
      }),
    }));
    
    render(
    <AuthContextProvider>
      <ChatContext.Provider value={userContextValue}>
        <ChatPartnerContext.Provider value={chatPartnerContextValue}>
          <Messages/>
        </ChatPartnerContext.Provider>
      </ChatContext.Provider>
      </AuthContextProvider>
    );
    expect(screen.getByTestId("messages")).toBeInTheDocument();
    
  });
});
