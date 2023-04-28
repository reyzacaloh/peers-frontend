import axios from "axios";
import { getTutor, getCurrentUser } from "../common";

jest.mock("axios");

describe("getTutor", () => {
  it("should call axios.get with correct parameters", async () => {
    const mockResponse = {
      data: {
        tutor: {
          name: "John",
          email: "john@example.com",
        },
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);
    const token = "some-token";
    const callback = jest.fn();
    await getTutor(token, callback);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/tutor_form/tutor/data`,
      {
        headers: {
          Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
        },
      }
    );
  });

  it("should call the callback function with tutor data if request is successful", async () => {
    const mockResponse = {
      data: {
        tutor: {
          name: "John",
          email: "john@example.com",
        },
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);
    const token = "some-token";
    const callback = jest.fn();
    await getTutor(token, callback);
    expect(callback).toHaveBeenCalledWith(mockResponse.data.tutor);
  });
});

describe("getCurrentUser", () => {
  it("should call axios.get with correct parameters", async () => {
    const mockResponse = {
      data: {
        user: {
          name: "John",
          email: "john@example.com",
        },
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);
    const callback = jest.fn();
    await getCurrentUser(callback);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/auth/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token")
          )}`,
        },
      }
    );
  });

  it("should call the callback function with user data if request is successful", async () => {
    const mockResponse = {
      data: {
        user: {
          name: "John",
          email: "john@example.com",
        },
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);
    const callback = jest.fn();
    await getCurrentUser(callback);
    expect(callback).toHaveBeenCalledWith(mockResponse.data.user);
  });

  it("should log error to console if request fails", async () => {
    const errorMessage = new Error("Some error occurred");
    axios.get.mockRejectedValueOnce(errorMessage);
    const callback = jest.fn();
    console.error = jest.fn();
    await getCurrentUser(callback);
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });
});
