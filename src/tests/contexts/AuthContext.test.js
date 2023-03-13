import React from 'react';
import AuthContextProvider from '../../contexts/AuthContext';
import { render, screen } from '@testing-library/react';
import App from '../../App';

test('render app with not auth', () => {
    render(
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    );
    const linkElement = screen.getByText(/beranda/i);
    expect(linkElement).toBeInTheDocument();
  });