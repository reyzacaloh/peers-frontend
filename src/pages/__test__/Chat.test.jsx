import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "../../contexts/AuthContext";
import ChatContextProvider from "../../contexts/ChatContext";
import Chat from "../Chat/Chat";

const data = [
  {
    profile_pic:
      "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
    username: "Mawar Eva",
    latest_message: "Long time no see",
  },
];


describe("Chat component", () => {
  it("renders ChatSidebar and ChatBox", () => {
    render(<AuthContextProvider>
      <ChatContextProvider>
        <Chat/>
      </ChatContextProvider>
    </AuthContextProvider>,
    { wrapper: BrowserRouter });
    expect(screen.getByTestId("chat_sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("chat_box")).toBeInTheDocument();
  });

 

  it('closes the ChatBox component when the "Close" button is clicked', () => {
    render(<AuthContextProvider>
      <ChatContextProvider>
        <Chat data={data}/>
      </ChatContextProvider>
    </AuthContextProvider>,
    { wrapper: BrowserRouter });
    fireEvent.click(screen.getByText("Mawar Eva"));
    fireEvent.click(screen.getByTestId('close_btn'));
    expect(screen.queryAllByTestId('messsages')).toHaveLength(0);
  });

  it('opens the ChatBox component when a user is clicked on the ChatSidebar component', () => {
    render(<AuthContextProvider>
      <ChatContextProvider>
        <Chat data={data}/>
      </ChatContextProvider>
    </AuthContextProvider>,
    { wrapper: BrowserRouter });
    
    fireEvent.click(screen.getByText("Mawar Eva"));
    expect(screen.queryAllByTestId('messages')).toHaveLength(1);
  });
});
