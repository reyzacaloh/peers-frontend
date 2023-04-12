import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "../../contexts/AuthContext";
import RegisterTutor from "../RegisterTutor";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("RegisterTutor", () => {
 
  describe("when tutor is not submitted", () => {
    it("renders the RegisterTutorForm component", () => {
      render(
        <AuthContext.Provider
          value={{
            state: {
              isAuthenticated: false,
              user: null,
              token: JSON.stringify("fake-token"),
              isTutor: false,
            },
            dispatch: {},
            tutor: {},
            getTutor: jest.fn(),
            setTutor: jest.fn()
          }}
        >
          <RegisterTutor />
        </AuthContext.Provider>,
        { wrapper: BrowserRouter }
      );
      expect(screen.getByTestId("tutor_form")).toBeInTheDocument();
    });
  });

  describe("when tutor is submitted but not accepted", () => {
    it("renders the TutorRegisterStatus component", async () => {
      const token = JSON.stringify("fake-token");
      const getTutor = jest.fn();
      const tutor = {
        is_submitted: true,
        is_accepted: false,
        is_verified: false,
      };
      render(
        <AuthContext.Provider value={{ state: { token }, getTutor, tutor }}>
          <RegisterTutor />
        </AuthContext.Provider>
      );
      await waitFor(() => {
        expect(screen.getByTestId("tutorRegisterStatus")).toBeInTheDocument();
      });
    });
  });

  describe("when tutor is submitted and accepted", () => {
    it("redirects to the tutor dashboard", () => {
      const token = JSON.stringify("fake-token");
      const getTutor = jest.fn();
      const tutor = {
        is_submitted: true,
        is_accepted: true,
        is_verified: true,
      };
      const navigate = jest.fn();
      useNavigate.mockReturnValue(navigate);
      render(
        <AuthContext.Provider value={{ state: { token }, getTutor, tutor }}>
          <RegisterTutor />
        </AuthContext.Provider>
      );
      expect(navigate).toHaveBeenCalledWith("/tutor/dashboard");
    });
  });
});
