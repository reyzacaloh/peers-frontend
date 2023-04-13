import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import TutorRegisterStatus from "../tutor_status_card/TutorRegisterStatus";

jest.mock("axios");

describe("TutorRegisterStatus", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("handleRegistrasi", () => {
    it("calls axios.delete with the correct URL and headers", async () => {
      const token = JSON.stringify("fake-token");
      const setTutor = jest.fn();
      const state = { token };
      render(
        <AuthContext.Provider value={{ state, setTutor, currentUser: {role:3} }}>
          <TutorRegisterStatus is_accepted={false} is_verified={true} />
        </AuthContext.Provider>
      );

      axios.delete.mockResolvedValueOnce({});

      const ajukanKembaliBtn = screen.getByText("Ajukan Kembali");
      fireEvent.click(ajukanKembaliBtn);

      await waitFor(() => {
        expect(axios.delete).toHaveBeenCalledTimes(1);
       
      });

      await waitFor(() => {
        expect(axios.delete).toHaveBeenCalledWith(
          `${process.env.REACT_APP_API_URL}/api/tutor_form/tutor/data`,
          { headers: { authorization: `Bearer ${token}` } }
        );
      })
    });

    it("calls setTutor with an empty object after axios.delete is resolved", async () => {
      const token = JSON.stringify("fake-token");
      const setTutor = jest.fn();
      const state = { token };
      render(
        <AuthContext.Provider value={{ state, setTutor }}>
          <TutorRegisterStatus is_accepted={false} is_verified={true} />
        </AuthContext.Provider>
      );

      axios.delete.mockResolvedValueOnce({});

      const ajukanKembaliBtn = screen.getByText("Ajukan Kembali");
      fireEvent.click(ajukanKembaliBtn);

      await waitFor(() => {
        expect(setTutor).toHaveBeenCalledTimes(1);
      });
      await waitFor(() => {
        expect(setTutor).toHaveBeenCalledWith({});
      });
    });
  });

  describe("render", () => {
    it("renders the correct icon and text when is_accepted and is_verified are both false", () => {
      const token = JSON.stringify("fake-token");
      const setTutor = jest.fn();
      const state = { token };
      render(
        <AuthContext.Provider value={{ state, setTutor }}>
          <TutorRegisterStatus is_accepted={false} is_verified={false} />
        </AuthContext.Provider>
      );

      expect(screen.getByText("Masih menunggu verifikasi")).toBeInTheDocument();
      expect(
        screen.getByText((content, element) => element.tagName === "svg")
      ).toBeInTheDocument();
    });
    it("renders the correct icon and text when is_accepted is false and is_verified is true", () => {
      const token = JSON.stringify("fake-token");
      const setTutor = jest.fn();
      const state = { token };
      render(
        <AuthContext.Provider value={{ state, setTutor }}>
          <TutorRegisterStatus is_accepted={false} is_verified={true} />
        </AuthContext.Provider>
      );


      expect(
        screen.getByText("Mohon Maaf Registrasi anda ditolak!")
      ).toBeInTheDocument();
      expect(
        screen.getByText((content, element) => element.tagName === "svg")
      ).toBeInTheDocument();
    });

    it("renders the correct icon and text when is_accepted is true and is_verified is false", () => {
      const token = JSON.stringify("fake-token");
      const setTutor = jest.fn();
      const state = { token };
      render(
        <AuthContext.Provider value={{ state, setTutor }}>
          <TutorRegisterStatus is_accepted={true} is_verified={false} />
        </AuthContext.Provider>
      );


      expect(
        screen.getByText("Mohon Maaf Registrasi anda ditolak!")
      ).toBeInTheDocument();
      expect(
        screen.getByText((content, element) => element.tagName === "svg")
      ).toBeInTheDocument();
    });

    it("renders the correct icon and text when is_accepted and is_verified are both true", () => {
      const token = JSON.stringify("fake-token");
      const setTutor = jest.fn();
      const state = { token };
      render(
        <AuthContext.Provider value={{ state, setTutor }}>
          <TutorRegisterStatus is_accepted={true} is_verified={true} />
        </AuthContext.Provider>
      );


      expect(
        screen.getByText("Mohon Maaf Registrasi anda ditolak!")
      ).toBeInTheDocument();
      expect(
        screen.getByText((content, element) => element.tagName === "svg")
      ).toBeInTheDocument();
    });
  });
});
