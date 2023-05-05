import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from "react-router-dom";
import TutorDashboard from '../TutorDashboard';

jest.mock('axios');

describe('Tutor Dashboard component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders Tutor Dashboard component without errors', async () => {
        render(
            <Router>
                <TutorDashboard />
            </Router>
        );
        const schedule = await screen.findByText(/Jadwal Mengajarmu/);
        expect(schedule).toBeInTheDocument();
    });

    test('displays correct user information after successful fetch', async () => {
        const mockData = {
            "schedules": [
                {
                    "id": 1,
                    "tutor_id": {
                        "uid": {
                            "email": "test@gmail.com",
                            "first_name": "Test",
                            "last_name": "Haha"
                        },
                        "id": 1
                    },
                    "learner_id": null,
                    "date_time": "2023-12-28T09:30:00Z",
                    "is_booked": false,
                    "is_finished": false
                },
                {
                    "id": 2,
                    "tutor_id": {
                      "uid": {
                        "email": "test@gmail.com",
                        "first_name": "Test",
                        "last_name": "Haha"
                      },
                      "id": 1
                    },
                    "learner_id": null,
                    "date_time": "2023-04-28T21:00:00Z",
                    "is_booked": true,
                    "is_finished": false
                  },              
            ]
        };
        axios.get.mockResolvedValueOnce({ data: mockData });
        render(
            <Router>
                <TutorDashboard />
            </Router>);
        await waitFor(() => expect(axios.get));
        const name = await screen.findByText(/Booked/);
        expect(name).toBeInTheDocument();
    });
});
