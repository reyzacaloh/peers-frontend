import { render, screen } from '@testing-library/react';
import App from './App';
import Login from "./components/Login";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("Renders login form", () => {
  render(<Login />);
  const linkElement = screen.getByText(/E-mail/i);
  const linkElement2 = screen.getByText(/Password/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
})