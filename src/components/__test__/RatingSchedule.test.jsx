import {render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import RatingSchedule from "../RatingSchedule";
import axios from 'axios';
import AuthContextProvider from "../../contexts/AuthContext";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");
describe('RatingSchedule test', () => {
    const setup = () => (
        render(<AuthContextProvider> <RatingSchedule /> </AuthContextProvider>, {wrapper: BrowserRouter})
    );
    test('all tabs should fully render with tutor data displayed', async () => {
        const mockResponse = 
        {"data" : {
            "statusCode": 200,
            "schedules": [
                {
                    "id": 1,
                    "tutor_id": {
                        "uid": {
                            "email": "admin@gmail.com",
                            "first_name": "Johanes",
                            "last_name": "Raka"
                        },
                        "id": 3
                    },
                    "learner_id": null,
                    "date_time": "2023-03-23T18:00:00Z",
                    "is_booked": false,
                    "is_finished": false
                },
                {
                    "id": 2,
                    "tutor_id": {
                        "uid": {
                            "email": "admin@gmail.com",
                            "first_name": "Triadana Nikaputra",
                            "last_name": ""
                        },
                        "id": 3
                    },
                    "learner_id": 6,
                    "date_time": "2025-12-23T20:00:00Z",
                    "is_booked": true,
                    "is_finished": true
                },
                {
                    "id": 3,
                    "tutor_id": {
                        "uid": {
                            "email": "admin@gmail.com",
                            "first_name": "JR",
                            "last_name": "TN"
                        },
                        "id": 3
                    },
                    "learner_id": 6,
                    "date_time": `${new Date().toJSON()}`,
                    "is_booked": true,
                    "is_finished": true
                }
            ]
        }}
        axios.get = jest.fn()
        axios.get.mockResolvedValueOnce(mockResponse)
        setup()
        expect(screen.getByText("History")).toBeInTheDocument();
        expect(axios.get).toHaveBeenCalled()
    });

    test('there should be no duplicate schedule', async () => {
        const current_time = new Date().toJSON()
        const mockResponse = 
        {"data" : {
            "statusCode": 200,
            "schedules": [
                {
                    "id": 2,
                    "tutor_id": {
                        "uid": {
                            "email": "admin@gmail.com",
                            "first_name": "Triadana Nikaputra",
                            "last_name": ""
                        },
                        "id": 3
                    },
                    "learner_id": 6,
                    "date_time": "2000-12-23T20:00:00Z",
                    "is_booked": true,
                    "is_finished": true
                },
                {
                    "id": 2,
                    "tutor_id": {
                        "uid": {
                            "email": "admin@gmail.com",
                            "first_name": "Triadana Nikaputra",
                            "last_name": ""
                        },
                        "id": 3
                    },
                    "learner_id": 6,
                    "date_time": "2000-12-23T20:00:00Z",
                    "is_booked": true,
                    "is_finished": true
                },
            ]
        }}
        axios.get = jest.fn()
        axios.get.mockResolvedValueOnce(mockResponse)
        setup()
        expect(axios.get).toHaveBeenCalled()
        await waitFor(() => {
            expect(screen.getAllByText("Triadana Nikaputra").length).toEqual(1);
        });
    });

    test('fetch failed and no tutor data shown', async () => {
        const expectedError = new Error("Network Error");
        axios.get = jest.fn()
        axios.get.mockRejectedValueOnce(expectedError);
        setup()
        expect(axios.get).toHaveBeenCalled()
        await waitFor(() => {
            expect(screen.queryByText("Triadana Nikaputra")).not.toBeInTheDocument();
        });
    });

});
