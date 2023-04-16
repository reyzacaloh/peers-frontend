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

test('render app with auth', () => {
    localStorage.setItem("token", JSON.stringify("TEST_TOKEN"));
    render(
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    );
    const linkElement = screen.getByText(/profil/i);
    expect(linkElement).toBeInTheDocument();
});

test('render app with auth as Tutor', () => {
    localStorage.setItem("isTutor", "true");
    render(
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    );
    const linkElement = screen.getByText(/profil/i);
    expect(linkElement).toBeInTheDocument();
    expect(localStorage.getItem("isTutor")).toEqual("true");
});
