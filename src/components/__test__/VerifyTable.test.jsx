import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import VerifyTable from "../verification_table/VerifyTable";

jest.mock("axios");

describe("Verify Table component", () => {
  const getData = () => {
    axios.get.mockResolvedValueOnce({
      data: {
        applicants: [
          {
            uid: { email: "user1@example.com" },
            transkrip: "https://example.com/transkrip1.pdf",
            ktp: "https://example.com/ktm1.pdf",
            ktm_person: "https://example.com/selfie1.pdf",
            pddikti: "12345",
          },
          {
            uid: { email: "user2@example.com" },
            transkrip: "https://example.com/transkrip2.pdf",
            ktp: "https://example.com/ktm2.pdf",
            ktm_person: "https://example.com/selfie2.pdf",
            pddikti: "54321",
          },
        ],
      },
    });
  };
  beforeEach(() => {
    getData();
    getData();
  });

  it("renders a table with users", async () => {
    render(<VerifyTable />);
    await waitFor(() =>
      expect(screen.getByText("user1@example.com")).toBeInTheDocument()
    );
    expect(screen.getByText("user2@example.com")).toBeInTheDocument();
  });

  it("calls the VerifyUser function with the correct parameters when accept button is clicked", async () => {
    axios.patch.mockImplementationOnce(() => Promise.resolve());
    render(<VerifyTable />);
    await waitFor(() => fireEvent.click(screen.getAllByText("accept")[0]));
    expect(axios.patch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/tutor_form/verify/`,
      expect.any(FormData),
      {
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
  });
  it("calls the VerifyUser function with the correct parameters when deny button is clicked", async () => {
    axios.patch.mockImplementationOnce(() => Promise.resolve({ data: "data" }));
    render(<VerifyTable />);
    await waitFor(() => fireEvent.click(screen.getAllByText("deny")[0]));
    expect(axios.patch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/tutor_form/verify/`,
      expect.any(FormData),
      {
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
  });
  it("should throw an error when patch request fails", async () => {
    const errorMessage = "Network error";
    axios.patch.mockRejectedValue({ meesage: errorMessage });
    const logSpy = jest.spyOn(global.console, "log");
    render(<VerifyTable />);
    try {
      await waitFor(() => fireEvent.click(screen.getAllByText("deny")[0]));
    } catch (error) {
      expect(logSpy).toHaveBeenCalledWith(`${errorMessage}`);
    }
  });
});
