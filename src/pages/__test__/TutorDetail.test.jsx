import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TutorDetail from '../TutorDetail/TutorDetail';
import { BrowserRouter as Router } from "react-router-dom";

jest.mock('axios');

describe('Tutor Detail component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders Tutor Detail component without errors', async () => {
        render(
            <Router>
                <TutorDetail />
            </Router>
        );
        const schedule = await screen.findByText(/Jadwal Mengajar/);
        expect(schedule).toBeInTheDocument();
    });

    test('displays correct user information after successful fetch', async () => {
        const mockData = {
            "tutors": [
                {
                    "subject": "test_subject",
                    "university": "test_university",
                    "uid": {
                        "first_name": "test_first_name",
                        "last_name": "test_last_name",
                    }
                }
            ]
        };
        axios.get.mockResolvedValueOnce({ data: mockData });
        render(
            <Router>
                <TutorDetail />
            </Router>);
        const name = await screen.findByText(/test_first_name test_last_name/);
        expect(name).toBeInTheDocument();
    });

    test('redirect if tutor is not found', async () => {
        const mockData = {
            "status": 404
        };
        axios.get.mockResolvedValueOnce({ data: mockData, });
        render(
            <Router>
                <TutorDetail />
            </Router>);
        await waitFor(() => expect(axios.get));
        const notFound = await screen.findByText(/g/);
        expect(notFound).toBeInTheDocument();
    });
});
