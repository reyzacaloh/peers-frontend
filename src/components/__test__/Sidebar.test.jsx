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

    const menuButton = screen.getByText("Cari Tutor");

    expect(menuButton).toBeInTheDocument();
  });

  test("navigates to different pages", () => {
    render(
      <AuthContext.Provider value={{tutor: {is_verified: true, is_accepted: true}, currentUser: {role: 1}}}>
        <BrowserRouter>
         <Sidebar />
       </BrowserRouter>
     </AuthContext.Provider>
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

    expect(screen.getByTestId("sideButton")).toBeInTheDocument();
  });

  test("render the right menu for tutor when already accepted", () => {
    render(
     <AuthContext.Provider value={{tutor: {is_verified: true, is_accepted: true}, currentUser: {role: 2}}}>
       <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    </AuthContext.Provider>
    );
    
    expect(screen.queryAllByText("Jadi Tutor")).toHaveLength(0);
    fireEvent.click(screen.getByText("Dashboard"));
    
    expect(window.location.pathname).toBe("/tutor/dashboard");
  });

  test('should set sidebarOpen to true when window width is greater than 1024', () => {
    global.innerWidth = 1200; // set window width to 1200px
    global.dispatchEvent(new Event('resize'));
    render(
     <AuthContextProvider>
       <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
     </AuthContextProvider>);
    expect(screen.getByText("Cari Tutor")).toBeInTheDocument();
  });

  test('should set sidebarOpen to false when window width is less than or equal to 1024', () => {
    global.innerWidth = 800; // set window width to 800px
    global.dispatchEvent(new Event('resize'));
    render(
      <AuthContextProvider>
        <BrowserRouter>
         <Sidebar />
       </BrowserRouter>
      </AuthContextProvider>);
    expect(screen.getByText("Cari Tutor")).toBeInTheDocument();
  });

});
