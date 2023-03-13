import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Chat from "./pages/Chat.jsx";
import FindTutor from "./pages/FindTutor.jsx";
import NotFound from "./pages/NotFound";
import TutorDashboard from "./pages/TutorDashboard";
import { AuthContext } from './contexts/AuthContext';
import RegisterForm from "./components/registerForm/RegisterForm";
import LoginForm from "./components/loginForm/LoginForm";
import Profile from "./pages/Profile";
import RegisterTutorForm from "./components/registerTutorForm/RegisterTutorForm";


function App() {

  const { state } = React.useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        {!state.isAuthenticated ? (
          <Routes>
            <Route path="/" element={
              <Dashboard />
            } />
            <Route path="/register" element={
              <RegisterForm />
            } />
            <Route path="/login" element={
              <LoginForm />
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={
              <Sidebar>
                <FindTutor />
              </Sidebar>} />
            <Route
              path="/chat" element={
                <Sidebar>
                  <Chat />
                </Sidebar>} />
            <Route
              path="/profile" element={
                <Sidebar>
                  <Profile />
                </Sidebar>} />
            <Route path="/tutor" element={
              !state.isTutor ?
                <RegisterTutorForm /> :
                <Sidebar>
                  <TutorDashboard />
                </Sidebar>
            } /> :
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;


