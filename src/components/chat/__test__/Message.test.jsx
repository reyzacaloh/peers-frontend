import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Message from "../Message";

describe("Message", () => {
  const data = {
    profile_pic: "https://example.com/profile.jpg",
    message: "Hello, world!",
    time: "2022-04-05T10:30:00Z",
    message_img: "https://example.com/image.jpg",
    isOwner: true,
  };

  it("renders message content", () => {
    render(<Message data={data} />);
    expect(screen.getByText(data.message)).toBeInTheDocument();
  });

  it("renders message image", () => {
    render(<Message data={data} />);
    expect(screen.getByAltText("msg_pic")).toHaveAttribute(
      "src",
      data.message_img
    );
  });

  it("renders message profile picture", () => {
    render(<Message data={data} />);
    expect(screen.getByAltText("profile_pic")).toHaveAttribute(
      "src",
      data.profile_pic
    );
  });

  it("renders message time", () => {
    render(<Message data={data} />);
    expect(screen.getByText(data.time)).toBeInTheDocument();
  });

  it("scrolls into view on mount", () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    render(<Message data={data} />);
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it("should show full image when the image of the message clicked", () =>{
    render(<Message data={data}/>)

    const image = screen.getByAltText("msg_pic");
    const imageContainer = screen.getByTestId("image_container");

    expect(screen.getByTestId("image_container")).not.toHaveClass("full");

    fireEvent.click(image);

    expect(screen.getByTestId("image_container")).toHaveClass("full");
    expect(screen.getByAltText(data.message_img)).toHaveAttribute("src", data.message_img);
    expect(screen.getByText(data.message)).toBeInTheDocument();
    expect(screen.getByText(data.time)).toBeInTheDocument();
    expect(screen.getByAltText("profile_pic")).toBeInTheDocument();

    fireEvent.click(imageContainer);
    expect(screen.getByTestId("image_container")).not.toHaveClass("full");
  })

  it("should render default profile image when profile_pic not available", () => {
    render(<Message data={{...data, profile_pic: ""}}/>)

    const profile_pic = screen.getByAltText("profile_pic");

    expect(profile_pic).toHaveAttribute("src", "user_pic_placeholder.png");
  })

  it("should render properly when no data passed", () => {
    render(<Message/>)
    const profile_pic = screen.getByAltText("profile_pic");

    expect(profile_pic).toHaveAttribute("src", "user_pic_placeholder.png");
    expect(screen.queryAllByAltText("msg_pic")).toHaveLength(0);
    expect(screen.queryAllByTestId("message_text")).toHaveLength(0);
  })
});
