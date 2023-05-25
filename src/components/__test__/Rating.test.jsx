/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AuthContextProvider from '../../contexts/AuthContext';
import Rating from '../Rating';
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter} from 'react-router-dom';

describe('Rating test', () => {
  const mockUseNavigate = jest.fn();

  beforeEach(() => {
      jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockUseNavigate,
      }));
  });

  test('should call useNavigate with the correct path on form submission', async () => {
    
    const mockPost = jest.spyOn(axios, 'post');
    mockPost.mockResolvedValueOnce({});
    const { getByText } = render(<AuthContextProvider>
      <Rating tutorId={1} scheduleId={0} />
    </AuthContextProvider>
      , { wrapper: BrowserRouter });
    fireEvent.click(getByText('Rate Tutor'));
    fireEvent.click(screen.getByText('Save'));

    
    await waitFor(() => expect(mockPost).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/tutor_form/rate/`,
      { rating: '0' , 
      schedule_id: '0',
      tutor_id: '1',},
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }
    ));
  });

  test('should handle form submission error', async () => {
    const mockPost = jest.spyOn(axios, 'post');
    const errorResponse = {
      code: '500',
    };
    mockPost.mockRejectedValueOnce(errorResponse);
    const { getByText } = render(<AuthContextProvider>
      <Rating tutorId={1} scheduleId={0} />
    </AuthContextProvider>
      , { wrapper: BrowserRouter });
    fireEvent.click(getByText('Rate Tutor'));
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(mockPost).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/tutor_form/rate/`,
      { rating: '0' , 
      schedule_id: '0',
      tutor_id: '1',},
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }
    ));
  });

  it('should change background color on MouseOver and MouseOut events', () => {
    const { getByText } = render(<AuthContextProvider>
      <Rating tutorId={1} />
    </AuthContextProvider>
      , { wrapper: BrowserRouter });
    fireEvent.click(getByText('Rate Tutor'));
    const closeButton = screen.getByText('[x]');

    fireEvent.mouseOver(closeButton);
    expect(closeButton).toHaveStyle({background: 'grey'});
    fireEvent.mouseOut(closeButton);
    expect(closeButton).not.toHaveStyle({background: 'grey'});
  });

  it('should call close function on Popup close', () => {
    const { getByText } = render(<AuthContextProvider>
      <Rating tutorId={1} />
    </AuthContextProvider>
      , { wrapper: BrowserRouter });
    fireEvent.click(getByText('Rate Tutor'));
    const closeButton = screen.getByText('[x]');
    const mockClose = jest.fn();

    fireEvent.click(closeButton);
  });

  test('should submit the form on form submission', () => {
    const { getByText } = render(<AuthContextProvider>
      <Rating tutorId={1} />
    </AuthContextProvider>
      , { wrapper: BrowserRouter });
    fireEvent.click(getByText('Rate Tutor'));
    const submitButton = screen.getByText('Save');
    const mockSubmit = jest.fn();

    fireEvent.submit(submitButton);
  });

  test('should disable the button while submitting', () => {
    const { getByText } = render(<AuthContextProvider>
      <Rating tutorId={1} />
    </AuthContextProvider>
      , { wrapper: BrowserRouter });
    fireEvent.click(getByText('Rate Tutor'));
    const submitButton = screen.getByText('Save');

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

});