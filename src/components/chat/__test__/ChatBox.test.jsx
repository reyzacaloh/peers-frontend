import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ChatBox from "../ChatBox";
import AuthContextProvider from "../../../contexts/AuthContext";
import ChatContextProvider from "../../../contexts/ChatContext";
import ChatPartnerContextProvider from "../../../contexts/ChatPartnerContext";

describe("ChatBox", () => {
  const data = {
    profile_pic: "user_pic.png",
    username: "John Doe",
  };

  beforeEach(()=> {
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
  })

  it("renders blank chat box when closed", () => {
    render(
        <AuthContextProvider>
          <ChatContextProvider >
            <ChatPartnerContextProvider>
            <ChatBox open={false} />
            </ChatPartnerContextProvider>
          </ChatContextProvider>
          </AuthContextProvider>
        );
    expect(screen.getByText("Start Chatting Now!")).toBeInTheDocument();
  });

  it("renders chat box when open", () => {
    render(
        <AuthContextProvider>
          <ChatContextProvider >
            <ChatPartnerContextProvider>
            <ChatBox data={data} open />
            </ChatPartnerContextProvider>
          </ChatContextProvider>
          </AuthContextProvider>
        );
 
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByTestId("SendIcon")).toBeInTheDocument();
    expect(screen.getByTestId("AddCircleOutlineOutlinedIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ReportOutlinedIcon")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();

    render(
        <AuthContextProvider>
          <ChatContextProvider >
            <ChatPartnerContextProvider>
            <ChatBox data={data} open onClose={onClose} />
            </ChatPartnerContextProvider>
          </ChatContextProvider>
          </AuthContextProvider>
        );

    userEvent.click(screen.getByText("Close"));
    expect(onClose).toHaveBeenCalled();
  });

  it("displays default values when no data is provided", () => {
    render(
        <AuthContextProvider>
          <ChatContextProvider >
            <ChatPartnerContextProvider>
            <ChatBox open />
            </ChatPartnerContextProvider>
          </ChatContextProvider>
          </AuthContextProvider>
        );

    expect(screen.getByText("Unknown")).toBeInTheDocument();
    expect(screen.getByAltText("profile_picture")).toHaveAttribute(
      "src",
      "user_pic_placeholder.png"
    );
  });
});
