import React from "react";
import Register from "../Register/Register";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "../../contexts/AuthContext";

test("renders login form", () => {
  render(
    <AuthContextProvider>
      <Register />
    </AuthContextProvider>,
    { wrapper: BrowserRouter }
  );
  const emailField = screen.getByTestId("email");
  const passwordField = screen.getByTestId("password");
  const firstNameField = screen.getByTestId("first_name");
  const lastNameField = screen.getByTestId("last_name");
  const dateOfBirth = screen.getByTestId("date_of_birth");
  const profilePic = screen.getByTestId("profile_picture");
  const registerButton = screen.getByText("Register");
  const formTitle = screen.getByText("Register Form");

  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(firstNameField).toBeInTheDocument();
  expect(lastNameField).toBeInTheDocument();
  expect(dateOfBirth).toBeInTheDocument();
  expect(profilePic).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
  expect(formTitle).toBeInTheDocument();
});
