import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TutorCard from "../tutor_card/TutorCard";

const mockTutorData = {
  firstname: "John",
  university: "Harvard",
  profile_picture: "https://i.pravatar.cc/300?img=1",
  descriptions: "I am an experienced tutor.",
  price_per_hour: 50000,
  review_count: 10,
  rating: 4.5,
};

describe("TutorCard", () => {
  it("renders tutor data correctly", () => {
    render(<TutorCard data={mockTutorData} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Harvard")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("(10 ulasan)")).toBeInTheDocument();
    expect(screen.getByText("I am an experienced tutor.")).toBeInTheDocument();
    expect(screen.getByText("Rp50,000/jam")).toBeInTheDocument();
  });

  it("handles onClick event correctly", () => {
    const onClickMock = jest.fn();
    render(<TutorCard onClick={onClickMock} data={mockTutorData} />);

    userEvent.click(screen.getByTestId("tutor_card"));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders placeholder data when tutor data is not available", () => {
    render(<TutorCard />);

    expect(screen.getByTestId("tutor_card")).not.toBeNull();
    expect(screen.getByTestId("tutor_card")).not.toBeUndefined();
  });

  it("formats price correctly", () => {
    const mockTutorDataWithPrice = {
      ...mockTutorData,
      price_per_hour: 150000,
    };

    render(<TutorCard data={mockTutorDataWithPrice} />);

    expect(screen.getByText("Rp150,000/jam")).toBeInTheDocument();
  });
});
