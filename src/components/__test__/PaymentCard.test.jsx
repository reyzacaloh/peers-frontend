import React from "react";
import { render, screen } from "@testing-library/react";
import PaymentCard from "../payment_card/PaymentCard";
import { toTimestamp } from "../../utils/common";

describe("PaymentCard", () => {
  let props;

  beforeEach(() => {
    props = {
      data: {
        transaction_id: "123",
        tutor_name: "John Doe",
        subject: "Math",
        schedule: new Date(),
        price: 100,
        date: new Date(),
        snap_token: "token",
      },
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders without crashing", () => {
    render(<PaymentCard {...props} />);
  });

  it("displays the correct tutor name", () => {
    render(<PaymentCard {...props} />);
    expect(screen.getByText("Tutor Name")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("displays the correct subject", () => {
    render(<PaymentCard {...props} />);
    expect(screen.getByText("Subject")).toBeInTheDocument();
    expect(screen.getByText("Math")).toBeInTheDocument();
  });

  it("displays the correct schedule", () => {
    render(<PaymentCard {...props} />);
    expect(screen.getByText("Schedule")).toBeInTheDocument();
    expect(screen.getByTestId("schedule-test").textContent).toEqual(
      toTimestamp(props.data.schedule)
    );
  });

  it("displays the correct order ID", () => {
    render(<PaymentCard {...props} />);
    expect(screen.getByText("Order ID")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("displays the correct created date", () => {
    render(<PaymentCard {...props} />);
    expect(screen.getByText("Created at")).toBeInTheDocument();
    expect(screen.getByTestId("created-date").textContent).toEqual(
      toTimestamp(props.data.date)
    );
  });

  it("displays the correct total price", () => {
    render(<PaymentCard {...props} />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Rp100")).toBeInTheDocument();
  });

 
});
