import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import Payment from '../payment/Payment';
import AuthContextProvider from '../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

describe('Payment', () => {
  const mockBills = [
    { transaction_id: 1, price: 100 },
    { transaction_id: 2, price: 200 },
  ];
  
  beforeAll(() => {
    process.env.REACT_APP_API_URL = 'http://localhost:3000';
    process.env.REACT_APP_MIDTRANS_SCRIPT_URL = 'http://example.com/script.js';
    process.env.REACT_APP_MIDTRANS_CLIENT_KEY = '12345';
  });

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: { booking_list: mockBills } });
  });



 
  it('should display no billing message if bills array is empty', async () => {
    axios.get.mockResolvedValueOnce({ data: { booking_list: [] } });
    render(<AuthContextProvider> <Payment /> </AuthContextProvider>, {wrapper: BrowserRouter})

    await screen.findByText('No Billing');
  });
});
