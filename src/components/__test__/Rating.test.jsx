import { render, fireEvent } from '@testing-library/react';
import Rating from '../Rating';

describe('Rating component', () => {
  test('renders the component', () => {
    render(<Rating />);
  });

  test('handles click event on star rating', () => {
    const { container } = render(<Rating />);
    const stars = container.querySelectorAll('svg');

    fireEvent.click(stars[2]); 
  });

  test('handles mouse over event on star rating', () => {
    const { container } = render(<Rating />);
    const stars = container.querySelectorAll('svg');

    fireEvent.mouseOver(stars[4]); 
  });

  test('handles mouse leave event on star rating', () => {
    const { container } = render(<Rating />);
    const stars = container.querySelectorAll('svg');

    fireEvent.mouseOver(stars[2]); 
    fireEvent.mouseLeave(stars[2]); 
  });

  test('handles submit button click', () => {
    const { container } = render(<Rating />);
    const submitButton = container.querySelector('button');

    fireEvent.click(submitButton);
  });
});