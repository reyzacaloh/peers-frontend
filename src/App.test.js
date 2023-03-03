import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard page', () => {
  render(<App />);
  const linkElement = screen.getByText(/dashboard page/i);
  expect(linkElement).toBeInTheDocument();
});
