import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider, {AuthContext} from '../../contexts/AuthContext';
import Sidebar from "../Sidebar";

describe("Sidebar", () => {
  test("renders without errors", () => {
    render(
     <AuthContextProvider>
       <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
     </AuthContextProvider>
    );
  });

  test("opens and closes the sidebar", () => {
   render(
      <AuthContextProvider>
      <BrowserRouter>
       <Sidebar />
     </BrowserRouter>
    </AuthContextProvider>
    );

    const menuButton = screen.getByTestId("menu_icon");
    const menuButton2 = screen.getByTestId("menu_icon2");
    const overlay = screen.getByTestId("overlay");

    expect(overlay).toHaveClass("overlay");

    fireEvent.click(menuButton);

    expect(overlay).toHaveClass("hide");

    fireEvent.click(menuButton2);

    expect(overlay).not.toHaveClass("hide");
  });

  test("navigates to different pages", () => {
    render(
      <AuthContextProvider>
      <BrowserRouter>
       <Sidebar />
     </BrowserRouter>
    </AuthContextProvider>
    );

    fireEvent.click(screen.getByText("Cari Tutor"));

    expect(window.location.pathname).toBe("/");

    fireEvent.click(screen.getByText("Pesan"));

    expect(window.location.pathname).toBe("/chat");

    fireEvent.click(screen.getByText("Profil"));

    expect(window.location.pathname).toBe("/profile");

    fireEvent.click(screen.getByText("Jadi Tutor"));

    expect(window.location.pathname).toBe("/tutor");

    fireEvent.click(screen.getByText("Verify Tutor"));

    expect(window.location.pathname).toBe("/verify");
  });

  test("render the right menu for tutor when already accepted", () => {
    render(
     <AuthContext.Provider value={{tutor: {is_verified: true, is_accepted: true}}}>
       <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    </AuthContext.Provider>
    );
    
    expect(screen.queryAllByText("Jadi Tutor")).toHaveLength(0);
    fireEvent.click(screen.getByText("Dashboard"));
    
    expect(window.location.pathname).toBe("/tutor/dashboard");
  });

});
