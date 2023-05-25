import React from "react";
import { render, fireEvent,screen } from "@testing-library/react";
import Input from "../Input";
import AuthContextProvider from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";
import { ChatPartnerContext } from "../../../contexts/ChatPartnerContext";
describe("Input component", () => {
  
  const currentUser = { uid: "123", role : 2 };
  const data = { chatId: "abc", user: { uid: "456" } };

  it("should update the message state when user types in the input field", () => {
    render(
        <AuthContextProvider>
          <ChatContext.Provider value={{ currentUser }}>
            <ChatPartnerContext.Provider value={data}>
              <Input/>
            </ChatPartnerContext.Provider>
          </ChatContext.Provider>
          </AuthContextProvider>
        );
    const input = screen.getByPlaceholderText("Type a message");

    fireEvent.change(input, { target: { value: "Hello, world!" } });

    expect(input.value).toBe("Hello, world!");

    
  });

 });
