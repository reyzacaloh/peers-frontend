import React from "react";
import { render,screen } from "@testing-library/react";
import ChatPartnerContextProvider from "../../contexts/ChatPartnerContext";
import { ChatContext } from "../../contexts/ChatContext";



describe('ChatPartnerContextProvider', () => {
    it('should render children and provide context', () => {
      const currentUser = { uid: 123 };
      render(
        <ChatContext.Provider value={{ currentUser }}>
          <ChatPartnerContextProvider>
            <div data-testid="child-component" />
          </ChatPartnerContextProvider>
        </ChatContext.Provider>
      );
  
      expect(screen.getByTestId('child-component')).toBeInTheDocument();

    });
  });