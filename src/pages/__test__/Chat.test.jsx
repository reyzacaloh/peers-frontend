import { fireEvent, render, screen, waitFor,renderHook,act } from "@testing-library/react";
import React,{useState,useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "../../contexts/AuthContext";
import ChatContextProvider,{ChatContext} from "../../contexts/ChatContext";
import ChatPartnerContextProvider,{ChatPartnerContext} from "../../contexts/ChatPartnerContext";
import Chat from "../Chat/Chat";
import { doc,onSnapshot } from 'firebase/firestore';
import {db} from "../../firebase"


jest.mock('firebase/firestore'); // Mock the Firestore onSnapshot method

it("renders ChatSidebar and ChatBox", () => {
  render(
      <AuthContextProvider>
        <ChatContextProvider>
          <ChatPartnerContextProvider>
            <Chat/> 
          </ChatPartnerContextProvider>
        </ChatContextProvider>
      </AuthContextProvider>,
      { wrapper: BrowserRouter }
  );
  expect(screen.getByTestId("chat_sidebar")).toBeInTheDocument();
  expect(screen.getByTestId("chat_box")).toBeInTheDocument();
});




test('mock onSnapshot', async () => {

  const currentUser = { uid: '123' };

  const dispatch = jest.fn();
  const newChats = {
    chat1: {
      userInfo: { name: 'John', email: 'john@example.com' },
      date: new Date(2022, 3, 1),
    },
    chat2: {
      userInfo: { name: 'Jane', email: 'jane@example.com' },
      date: new Date(2022, 3, 2),
    },
  }

    onSnapshot.mockImplementationOnce((_, callback) => {
      callback({
        data: () => (newChats),
      });

      return jest.fn();
    });
    render(
      <AuthContextProvider>
        <ChatContext.Provider value={{ currentUser }}>
          <ChatPartnerContext.Provider value={{ dispatch }}>
            <Chat /> 
          </ChatPartnerContext.Provider>
        </ChatContext.Provider>
      </AuthContextProvider>,
      { wrapper: BrowserRouter }
  );
  expect(onSnapshot).toHaveBeenCalledWith(
    doc(db, 'userChats', currentUser.uid),
    expect.any(Function)
  );

});
  
it('should call unsub function', () => {
  const currentUser = { uid: '123' };
  const setChats = jest.fn();
  const dispatch = jest.fn();
  const unsub = jest.fn();

  onSnapshot.mockImplementationOnce((_, callback) => {
    callback({
      data: () => ({
        chat1: {
          userInfo: { name: 'John', email: 'john@example.com' },
          date: new Date(2022, 3, 1),
        },
        chat2: {
          userInfo: { name: 'Jane', email: 'jane@example.com' },
          date: new Date(2022, 3, 2),
        },
      }),
    });

    return unsub;
  });

  render(
    <AuthContextProvider>
      <ChatContext.Provider value={{ currentUser }}>
        <ChatPartnerContext.Provider value={{ dispatch }}>
          <Chat setChats={setChats}/> 
        </ChatPartnerContext.Provider>
      </ChatContext.Provider>
    </AuthContextProvider>,
    { wrapper: BrowserRouter }
    )

    

  expect(onSnapshot).toHaveBeenCalledWith(
    doc(db, 'userChats', currentUser.uid),
    expect.any(Function)
  );

  // Check that unsub has not been called yet
  expect(unsub).not.toHaveBeenCalled();


});
