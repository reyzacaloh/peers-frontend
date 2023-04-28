import axios from "axios";
import React, { useContext } from "react";
import { act, render, screen } from "@testing-library/react";
import ChatContextProvider, { ChatContext } from "../../contexts/ChatContext";

jest.mock("axios");

describe("ChatContextProvider", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sets currentUser context value after fetching the user data", async () => {
    const user = { name: "John Doe" };
    axios.get.mockResolvedValueOnce({ data: { user } });

    const TestComponent = () => {
      const { currentUser } = useContext(ChatContext);
      return <div data-testid="current-user">{currentUser.name}</div>;
    };

    render(
      <ChatContextProvider>
        <TestComponent />
      </ChatContextProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for promises to resolve
    });

    expect(screen.getByTestId("current-user")).toHaveTextContent(user.name);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/auth/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
  });

  it("handles error in fetching user data", async () => {
    axios.get.mockRejectedValueOnce(new Error("Something went wrong!"));

    const TestComponent = () => {
      const { currentUser } = useContext(ChatContext);
      return <div data-testid="current-user">{currentUser.name}</div>;
    };

    render(
      <ChatContextProvider>
        <TestComponent />
      </ChatContextProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for promises to resolve
    });

    expect(screen.getByTestId("current-user")).toHaveTextContent("");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/auth/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
  });
});
