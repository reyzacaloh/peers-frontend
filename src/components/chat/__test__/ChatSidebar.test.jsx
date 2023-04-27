import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ChatSidebar from "../ChatSidebar";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("ChatSidebar component", () => {
  const mockData = [
    {
      profile_pic: "https://photos.hancinema.net/photos/largephoto1636274.jpg",
      username: "Ahn Go Eun",
      latest_message: "Hello, how are you doing?",
    },
    {
      profile_pic:
        "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg",
      username: "Mawar Eva",
      latest_message: "Long time no see",
    },
    {
      profile_pic: "",
      username: "",
      latest_message: "",
    },
  ];

  it("renders data correctly", () => {
    render(<ChatSidebar data={mockData} />);
    expect(screen.getByText("Ahn Go Eun")).toBeInTheDocument();
    expect(screen.getByText("Hello, how are you doing?")).toBeInTheDocument();
    expect(screen.getByText("Mawar Eva")).toBeInTheDocument();
    expect(screen.getByText("Long time no see")).toBeInTheDocument();
  });

  it("calls onClickChat when chat info is clicked", () => {
    const mockOnClickChat = jest.fn();
    render(<ChatSidebar data={mockData} onClickChat={mockOnClickChat} />);
    // eslint-disable-next-line testing-library/no-node-access
    const chatInfo = screen.getByText("Ahn Go Eun");
    fireEvent.click(chatInfo);
    expect(mockOnClickChat).toHaveBeenCalledWith(mockData[0]);
  });

  it("navigates to home when Back is clicked", () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    render(<ChatSidebar data={mockData} />);
    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
