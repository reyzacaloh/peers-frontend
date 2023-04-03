import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ChatBox from "../ChatBox";

describe("ChatBox", () => {
  const data = {
    profile_pic: "user_pic.png",
    username: "John Doe",
  };

  beforeEach(()=> {
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
  })

  it("renders blank chat box when closed", () => {
    render(<ChatBox open={false} />);
    expect(screen.getByText("Start Chatting Now!")).toBeInTheDocument();
  });

  it("renders chat box when open", () => {
    render(<ChatBox data={data} open />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByTestId("SendIcon")).toBeInTheDocument();
    expect(screen.getByTestId("AddCircleOutlineOutlinedIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ReportOutlinedIcon")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<ChatBox data={data} open onClose={onClose} />);
    userEvent.click(screen.getByText("Close"));
    expect(onClose).toHaveBeenCalled();
  });

  it("displays default values when no data is provided", () => {
    render(<ChatBox open />);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
    expect(screen.getByAltText("profile_picture")).toHaveAttribute(
      "src",
      "user_pic_placeholder.png"
    );
  });
});
