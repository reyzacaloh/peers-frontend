import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router } from "react-router-dom";
import Chat from './pages/Chat/Chat';
import FindTutor from './pages/FindTutor';
import NotFound from './pages/NotFound';
import React from 'react';
import TutorDashboard from './pages/TutorDashboard';
import { AuthContext } from './contexts/AuthContext';
import Profile from './pages/Profile';
import AuthContextProvider from "./contexts/AuthContext";
import Verification from '../src/pages/Verification';

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})
test('renders app, scroll and click buttons', () => {

  window.HTMLElement.prototype.scrollIntoView = function () { };
  render(
  <AuthContext.Provider value={{state: {isAuthenticated: false, user: null, token: null, isTutor: false}, dispatch: {}, tutor: {}}}>
    <App />
</AuthContext.Provider>);
  const homeElement = screen.getByText(/beranda/i);
  const featureElement = screen.getByText(/fitur/i);

  fireEvent.click(homeElement);
  expect(homeElement).toBeInTheDocument();

  fireEvent.scroll(window, { target: { scrollY: 800 } });
  const classElement = screen.getByText(/kelas/i);
  expect(classElement).toBeInTheDocument();

  fireEvent.scroll(window, { target: { scrollY: -800 } });
  
  fireEvent.click(featureElement);
  expect(featureElement).toBeInTheDocument();
});

test('render app with not auth', () => {
  render(
    <AuthContext.Provider value={{state: {isAuthenticated: false, user: null, token: null, isTutor: false}, dispatch: {}, tutor: {}}}>
        <App />
    </AuthContext.Provider>
  );
  const linkElement = screen.getByText(/beranda/i);
  expect(linkElement).toBeInTheDocument();
});

test('render app with auth', () => {
  render(
    <AuthContext.Provider value={{state: {isAuthenticated: true, user: null, token: null, isTutor: false}, dispatch: {}, tutor: {}, currentUser: {role: 3}}}>
        <App />
    </AuthContext.Provider>
  );
  const linkElement = screen.getByText(/pesan/i);
  expect(linkElement).toBeInTheDocument();
});

test('render app with auth and tutor', () => {
  render(
    <AuthContext.Provider value={{state: {isAuthenticated: true, user: null, token: null, isTutor: true}, dispatch: {}, tutor: {}, currentUser: {role: 3}}}>
        <App />
    </AuthContext.Provider>
  );
  const linkElement = screen.getByText(/pesan/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders sidebar', () => {
  render(
    <AuthContextProvider>
      <Router>
        <Sidebar />
      </Router>
    </AuthContextProvider>
    
  );
  const linkElement = screen.getByText(/Pesan/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders chat', () => {
  render(
    <AuthContextProvider>
      <Router>
        <Chat/>
      </Router>
    </AuthContextProvider>
  );
  const linkElement = screen.getByText(/Chat/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders find tutor', () => {
  render(
    <Router>
      <FindTutor />
    </Router>
      
  );  

  const linkElement = screen.getByText(/Cari Tutor/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders not found page', () => {
  render(
    <NotFound />
  );
  const linkElement = screen.getByText(/Not Found/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders tutor dashboard page', () => {
  render(
    <TutorDashboard />
  );
  const linkElement = screen.getByText(/Tutor Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Profile page', () => {
  render(<AuthContextProvider><Profile /></AuthContextProvider>, {wrapper: Router});
  const linkElement = screen.getByText(/Profile page/i);
  expect(linkElement).toBeInTheDocument();
}); 

test('renders verify tutor', () => {
  render(
    <Verification/>
  );  

  const linkElement = screen.getByText(/No/i);
  expect(linkElement).toBeInTheDocument();
});
