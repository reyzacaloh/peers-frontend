import {act, render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import TutorScheduleForm from "../tutorScheduleForm/TutorScheduleForm";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import AuthContextProvider from "../../contexts/AuthContext";
import "@testing-library/jest-dom/extend-expect";

describe('TutorScheduleForm test', () => {
    const renderScheduleForm = () => (
        render(<AuthContextProvider> <TutorScheduleForm /> </AuthContextProvider>, {wrapper: BrowserRouter})
    );
    let dateField;
    let timeField;
    let saveButton;

    beforeEach(() => {
        renderScheduleForm();
        dateField = screen.getByTestId("date");
        timeField = screen.getByTestId("time");
        saveButton = screen.getByText('Save');
    });

    test('all fields in form fully renders', () => {
        expect(dateField).toBeInTheDocument();
        expect(timeField).toBeInTheDocument();
    });

    test('when backend API call is successful', async () => {
        jest.mock('axios');
        axios.post = jest.fn();
        const logSpy = jest.spyOn(global.console,'log')
        const expectedResponse = {
            'success': true,
            'statusCode': '201 Created',
            'message': 'Form successfully submitted!',
        }
        axios.post.mockResolvedValueOnce(expectedResponse);
        act(() => {
            userEvent.type(dateField, "2077-01-01");
            userEvent.type(timeField, "12:30");
            userEvent.click(saveButton);
        });
        await waitFor(() =>
            expect(axios.post).toHaveBeenCalled()
        );
        expect(logSpy).toHaveBeenCalledWith('Success');
        logSpy.mockRestore();
    })

    test('when backend API call is unsuccessful', async () => {
        jest.mock('axios');
        axios.post = jest.fn();
        const logSpy = jest.spyOn(global.console,'log')
        const expectedError = new Error("Network Error");
        axios.post.mockRejectedValueOnce(expectedError);
        act(() => {
            userEvent.type(dateField, "2077-01-01");
            userEvent.type(timeField, "12:30");
            userEvent.click(saveButton);
        });
        await waitFor(() =>
            expect(axios.post).toHaveBeenCalled()
        );
        expect(logSpy).toHaveBeenCalledWith('Error: ', expectedError);
        logSpy.mockRestore();
    })

});