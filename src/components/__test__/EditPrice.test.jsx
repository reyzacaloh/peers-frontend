import {act, render, screen, waitFor} from "@testing-library/react";
import AuthContextProvider from "../../contexts/AuthContext";
import {BrowserRouter} from "react-router-dom";
import EditPrice from "../editPrice/EditPrice";
import axios from "axios";
import userEvent from "@testing-library/user-event";

describe('EditPrice test', () => {
  const renderScheduleForm = () => (
    render(<AuthContextProvider> <EditPrice/> </AuthContextProvider>, {wrapper: BrowserRouter})
  );
  let numberField;
  let updateButton;

  beforeEach(() => {
    renderScheduleForm();
    numberField = screen.getByTestId("price_per_hour");
    updateButton = screen.getByText('Update');
  });

  test('all fields in form fully renders', () => {
    expect(numberField).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });

  test('when backend API call is successful', async () => {
    jest.mock('axios');
    axios.patch = jest.fn();
    const logSpy = jest.spyOn(global.console,'log')
    const expectedResponse = {
      'statusCode': '200 Ok',
      'message': 'Tutor rates succesfully updated',
    };
    axios.patch.mockResolvedValueOnce(expectedResponse);
    act(() => {
      userEvent.type(numberField, "69420");
      userEvent.click(updateButton);
    });
    await waitFor(() =>
      expect(axios.patch).toHaveBeenCalled()
    );
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('Success');
    });
    logSpy.mockRestore();
  });

  test('when backend API call is unsuccessful', async () => {
    jest.mock('axios');
    axios.patch = jest.fn();
    const logSpy = jest.spyOn(global.console,'log')
    const expectedError = {
      'statusCode': '400 Bad Response',
      'message': 'Error: Network Error',
    };
    axios.patch.mockRejectedValueOnce(expectedError);
    act(() => {
      userEvent.type(numberField, "abcdef");
      userEvent.click(updateButton);
    });
    await waitFor(() =>
      expect(axios.patch).toHaveBeenCalled()
    );
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('Error: ', expectedError);
    });
    logSpy.mockRestore();
  });

});