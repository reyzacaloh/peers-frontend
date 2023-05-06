import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import AuthContextProvider from "../../contexts/AuthContext";
import "@testing-library/jest-dom/extend-expect";
import FindTutor from '../FindTutor';

describe('FindTutor page test', () => {
    const setup = () => (
        render(<AuthContextProvider> <FindTutor /> </AuthContextProvider>, {wrapper: BrowserRouter})
    );
    test('render success with all accepted tutor shown', async () => {
        const mockResponse = 
        {"data" : {
            "statusCode": 200,
            "tutors": [
                {
                    "subject": "Matematika SMA",
                    "university": "Universitas Indonesia",
                    "is_verified": true,
                    "is_accepted": true,
                    "uid": {
                        "id": 6,
                        "email": "admin@gmail.com",
                        "first_name": "Johanes",
                        "last_name": "Raka",
                        "date_of_birth": null,
                        "profile_picture": "/media/images/513412.jpg"
                    },
                    "desc": "",
                    "price_per_hour": 35000.0,
                    "rating": 0.0,
                    "review_count": 0
                },
                {
                    "subject": "Fisika SMA",
                    "university": "Universitas Indonesia",
                    "is_verified": true,
                    "is_accepted": true,
                    "uid": {
                        "id": 5,
                        "email": "johanes.raka@gmail.com",
                        "first_name": "Triadana",
                        "last_name": "Nikaputra",
                        "date_of_birth": "2002-01-12",
                        "profile_picture": "/media/images/JohanesRakaTriadanaNikaputra_StudentMeeting1.jpg"
                    },
                    "desc": "Hi! this is a test account",
                    "price_per_hour": 50000.0,
                    "rating": 5.0,
                    "review_count": 1
                }
            ]
        }}
        axios.get = jest.fn()
        axios.get.mockResolvedValueOnce(mockResponse)
        setup()
        expect(axios.get).toHaveBeenCalled()
        await waitFor(() => {
            expect(screen.getByText("Triadana Nikaputra")).toBeInTheDocument();
        });
        expect(screen.getByText("Johanes Raka")).toBeInTheDocument();
    });
    test('fetch error so no data is shown', async () => {
        const expectedError = new Error("Network Error");
        axios.get = jest.fn()
        axios.get.mockRejectedValueOnce(expectedError);
        setup()
        expect(axios.get).toHaveBeenCalled()
        await waitFor(() => {
            expect(screen.getByText("Tidak ada Tutor yang memenuhi syarat")).toBeInTheDocument();
        });
    });
    test('render different tutors when switch subject', async () => {
        const mockResponse1 = 
        {"data" : {
            "statusCode": 200,
            "tutors": [
                {
                    "subject": "Matematika SMA",
                    "university": "Universitas Indonesia",
                    "is_verified": true,
                    "is_accepted": true,
                    "uid": {
                        "id": 6,
                        "email": "admin@gmail.com",
                        "first_name": "Johanes",
                        "last_name": "Raka",
                        "date_of_birth": null,
                        "profile_picture": "/media/images/513412.jpg"
                    },
                    "desc": "",
                    "price_per_hour": 35000.0,
                    "rating": 0.0,
                    "review_count": 0
                },
                {
                    "subject": "Fisika SMA",
                    "university": "Universitas Indonesia",
                    "is_verified": true,
                    "is_accepted": true,
                    "uid": {
                        "id": 5,
                        "email": "johanes.raka@gmail.com",
                        "first_name": "Triadana",
                        "last_name": "Nikaputra",
                        "date_of_birth": "2002-01-12",
                        "profile_picture": "/media/images/JohanesRakaTriadanaNikaputra_StudentMeeting1.jpg"
                    },
                    "desc": "Hi! this is a test account",
                    "price_per_hour": 50000.0,
                    "rating": 5.0,
                    "review_count": 1
                }
            ]
        }}
        const mockResponse2 = 
        {"data" : {
            "statusCode": 200,
            "tutors": [
                {
                    "subject": "Matematika SMA",
                    "university": "Universitas Indonesia",
                    "is_verified": true,
                    "is_accepted": true,
                    "uid": {
                        "id": 6,
                        "email": "admin@gmail.com",
                        "first_name": "Johanes",
                        "last_name": "Raka",
                        "date_of_birth": null,
                        "profile_picture": "/media/images/513412.jpg"
                    },
                    "desc": "",
                    "price_per_hour": 35000.0,
                    "rating": 0.0,
                    "review_count": 0
                }
            ]
        }}
        axios.get = jest.fn().mockResolvedValueOnce(mockResponse1).mockResolvedValueOnce(mockResponse2)
        setup()
        const searchBar = screen.getByTestId('search-bar');
        // eslint-disable-next-line testing-library/no-node-access
        fireEvent.keyDown(searchBar.firstChild, { key: 'ArrowDown' });
        await screen.findByText('Matematika SMA');
        fireEvent.click(screen.getByText('Matematika SMA'));
        await waitFor(() => {
            expect(screen.getByText("Johanes Raka")).toBeInTheDocument();
        });
        expect(axios.get).toHaveBeenCalledTimes(2)
        expect(screen.queryByText("Triadana Nikaputra")).not.toBeInTheDocument();
    });
})
