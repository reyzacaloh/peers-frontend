import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatInfo from "../ChatInfo";

describe("ChatInfo", () => {
  const data = {
    profile_pic: "user_pic.png",
    username: "John Doe",
    latest_message: "Hello world!",
    time: "13:00",
  };

  it("renders default values when no data is provided", () => {
    render(<ChatInfo />);
    expect(screen.getByAltText("profile_picture")).toHaveAttribute(
      "src",
      "user_pic_placeholder.png"
    );
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("renders chat info when data is provided", () => {
    render(<ChatInfo data={data} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("13:00")).toBeInTheDocument();
    expect(screen.getByText("Hello world!")).toBeInTheDocument();
    expect(screen.getByAltText("profile_picture")).toHaveAttribute(
      "src",
      "user_pic.png"
    );
  });

  it("calls onClick when container is clicked", () => {
    const onClick = jest.fn();
    render(<ChatInfo data={data} onClick={onClick} />);
    userEvent.click(screen.getByTestId("chat_info_container"));
    expect(onClick).toHaveBeenCalled();
  });
});
