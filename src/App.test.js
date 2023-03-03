import { render, screen } from '@testing-library/react';
import App from './App';
import Profile from './pages/Profile';

test('renders dashboard page', () => {
  render(<App />);
  const linkElement = screen.getByText(/dashboard page/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Profile page', () => {
  render(<Profile />);
  const linkElement = screen.getByText(/Profile page/i);
  expect(linkElement).toBeInTheDocument();
}); 