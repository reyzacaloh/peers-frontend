import axios from "axios";
import { getTutor, getCurrentUser, toTimestamp, showSuccessToast, getTutorIncome, showErrorToast, dateFormat, timeFormat } from "../common";
import dayjs from "dayjs";
import { toast } from "react-toastify";

jest.mock("axios");
jest.mock('react-toastify');

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

describe('toTimestamp', () => {
  test('should format a date as "ddd, MMM D, YYYY hh:m A"', () => {
    const date = new Date('2022-12-31T23:59:59.999Z');
    const expectedOutput = dayjs(date).format('ddd, MMM D, YYYY hh:m A');
    const actualOutput = toTimestamp(date.toISOString());
    expect(actualOutput).toEqual(expectedOutput);
  });

  test('should return the string when given an invalid date', () => {
    const actualOutput = toTimestamp('invalid date');
    expect(actualOutput).toEqual('Invalid Date');
  });
});



describe('showSuccessToast', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should show a success toast with the given message', () => {
    const msg = 'Test message';
    showSuccessToast(msg);
    expect(toast.success).toHaveBeenCalledWith(msg, expect.any(Object));
  });

  it('should show a default success toast when no message is provided', () => {
    showSuccessToast();
    expect(toast.success).toHaveBeenCalledWith('Success!', expect.any(Object));
  });

  it('should set the correct options on the success toast', () => {
    showSuccessToast('Test message');
    expect(toast.success).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    );
  });
});

describe('showErrorToast', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should show a error toast with the given message', () => {
    const msg = 'Test message';
    showErrorToast(msg);
    expect(toast.error).toHaveBeenCalledWith(msg, expect.any(Object));
  });

  it('should show a default error toast when no message is provided', () => {
    showErrorToast();
    expect(toast.error).toHaveBeenCalledWith("Something went wrong. Try again later!", expect.any(Object));
  });

  it('should set the correct options on the error toast', () => {
    showErrorToast('Test message');
    expect(toast.error).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining( {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    );
  });
});

describe('getTutorIncome', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call the correct API endpoint with the correct headers', async () => {
    const mockToken = 'mock-token';
    localStorage.setItem('token', JSON.stringify(mockToken));
    const mockResponseData = { income: 100 };
    axios.get.mockResolvedValueOnce({ data: mockResponseData });

    const expectedEndpoint = `${process.env.REACT_APP_API_URL}/api/booking/tutor-income`;
    const expectedHeaders = { Authorization: `Bearer ${mockToken}` };

    await getTutorIncome();

    expect(axios.get).toHaveBeenCalledWith(expectedEndpoint, {
      headers: expectedHeaders,
    });
  });

  it('should return the response data on success', async () => {
    const mockResponseData = { income: 100 };
    axios.get.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getTutorIncome();

    expect(result).toEqual(mockResponseData);
  });

  it('should return an empty object on failure', async () => {
    const mockError = new Error('mock error');
    axios.get.mockRejectedValueOnce(mockError);

    const result = await getTutorIncome();

    expect(result).toEqual({});
  });
});

describe('dateFormat', () => {
  test('dateFormat should return the correct formatted date string', () => {
    // Test input
    const datetime = '2023-05-25T12:34:56Z';
  
    // Expected output
    const expected = '25/05/2023';
  
    // Call the function being tested
    const result = dateFormat(datetime);
  
    // Assert the result
    expect(result).toBe(expected);
  });

  test('returns the formatted date string without leading zero for month', () => {
    // Test input with month >= 10
    const datetime = '2023-10-25T12:34:56Z';

    // Call the function being tested
    const result = dateFormat(datetime);

    // Assert the result
    expect(result).toBe('25/10/2023');
  });
})

describe('timeFormat', () => {
  test('returns the formatted time string', () => {
    // Test input
    const datetime = '2023-05-25T12:34:56Z';

    // Mock the toLocaleTimeString method
    const mockToLocaleTimeString = jest.fn(() => '12:34:56 PM');
    Date.prototype.toLocaleTimeString = mockToLocaleTimeString;

    // Call the function being tested
    const result = timeFormat(datetime);

    // Assert the result
    expect(result).toBe('12:34:56 PM');
   
  });
});