import { render, renderHook, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router } from "react-router-dom";
import Chat from './pages/Chat';
import FindTutor from './pages/FindTutor';
import NotFound from './pages/NotFound';
import React, { Component } from 'react';
import Dashboard from './pages/Dashboard';

test('renders app', () => {
  render(<App />);
  const linkElement = screen.getByText(/dashboard page/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders dashboard page', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/dashboard page/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders sidebar', () => {
  render(
    <Router>
      <Sidebar />
    </Router>
  );
  const linkElement = screen.getByText(/Pesan/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders chat', () => {
  render(
    <Chat />
  );
  const linkElement = screen.getByText(/Chat/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders sidebar', () => {
  render(
    <FindTutor />
  );
  const linkElement = screen.getByText(/Find Tutor/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders not found page', () => {
  render(
    <NotFound />
  );
  const linkElement = screen.getByText(/Not Found/i);
  expect(linkElement).toBeInTheDocument();
});
