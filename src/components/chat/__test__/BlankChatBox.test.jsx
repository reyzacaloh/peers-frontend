import { render, screen } from '@testing-library/react';
import React from 'react';
import BlankChatBox from '../BlankChatBox';

describe('BlankChatBox component', () => {
  it('renders a message and an image', () => {
    render(<BlankChatBox />);
    const messageElement = screen.getByText('Start Chatting Now!');
    const imageElement = screen.getByAltText('peers');
    expect(messageElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });
});
