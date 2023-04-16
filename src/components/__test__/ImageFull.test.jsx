import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ImageFull from '../image_fullscreen/ImageFull';

const TestingWrapper = ({url}) => {
  const [open, setOpen] = useState(false);
  return (
    <ImageFull open={open} url={url} onClick={() => setOpen(!open)}/>
  )
}

const url = "https://example.com/image.jpg";
describe('ImageFull component', () => {
  test('renders correctly', () => {
    render(<ImageFull open={true} url={url} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", url);
  });

  test('displays full image when clicked', () => {
    render(
      <TestingWrapper url={url}/>
    );
    const image = screen.getByAltText(url);
    const imageContainer = screen.getByTestId('image_container');

    expect(image).toBeInTheDocument();
    expect(imageContainer).not.toHaveClass('full');

    fireEvent.click(image);

    expect(imageContainer).toHaveClass('full');
  });
});
