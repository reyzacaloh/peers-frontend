import React from "react";
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import Input from "../Input";
import AuthContextProvider from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";
import { ChatPartnerContext } from "../../../contexts/ChatPartnerContext";

describe("Input component", () => {
  const currentUser = { uid: "123" };
  const data = { chatId: "abc", user: { uid: "456" } };
  const renderInput = () => (
    render(
      <AuthContextProvider>
        <ChatContext.Provider value={currentUser}>
          <ChatPartnerContext.Provider value={data}>
            <Input/>
          </ChatPartnerContext.Provider>
        </ChatContext.Provider>
      </AuthContextProvider>
    )
  );

  it("should update the message state when user types in the input field", () => {
    renderInput();
    const input = screen.getByPlaceholderText("Type a message");

    fireEvent.change(input, { target: { value: "Hello, world!" } });

    expect(input.value).toBe("Hello, world!");
  });

  test('State test', async () => {
    let uploadField;
    let testFile;
    renderInput();
    uploadField = screen.getByTestId("input");
    testFile = new File(["(⌐□_□)"], "chucknorris.jpg", { type: "image/jpg" });
    await waitFor(() =>
      fireEvent.change(uploadField, {
        target: {files: [testFile]},
      })
    );
    expect(uploadField.files[0].name).toBe(testFile.name);
  });

 });
