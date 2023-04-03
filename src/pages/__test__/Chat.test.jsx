import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from '../Chat/Chat';
import { ChatSidebar, ChatBox } from '../../components/chat';

jest.mock('../../components/chat', () => ({
  ChatSidebar: jest.fn(() => <div data-testid="chat-sidebar" />),
  ChatBox: jest.fn(() => <div data-testid="chat-box" />)
}));
const data = [{ username: 'John', latest_message: 'Hi' }];
describe('Chat component', () => {
  it('renders ChatSidebar and ChatBox', () => {
    render(<Chat data={data}/>);
    expect(screen.getByTestId('chat-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('chat-box')).toBeInTheDocument();
  });

  it('passes data and onClickChat props to ChatSidebar', () => {
    const onClickChat = jest.fn();
    render(<Chat data={data} />);
    expect(ChatSidebar).toHaveBeenCalledWith({ data, onClickChat }, {});
  });

  it('opens ChatBox and sets user when chat is clicked', () => {
    
    render(<Chat data={data}/>);
    const chat = screen.getByText('John');
    fireEvent.click(chat);
    expect(ChatBox).toHaveBeenCalledWith({ open: true, data: { username: 'John', latest_message: 'Hi' }, onClose: expect.any(Function) }, {});
  });

  it('closes ChatBox when onClose is called', () => {
    const onClose = jest.fn();
    render(<Chat data={data} />);
    const chat = screen.getByText('John');
    fireEvent.click(chat);
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(ChatBox).toHaveBeenCalledWith({ open: false, data: {}, onClose }, {});
  });
});
