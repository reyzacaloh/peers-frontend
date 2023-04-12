import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Chat from "../pages/Chat.jsx";
import FindTutor from "../pages/FindTutor.jsx";
import NotFound from "../pages/NotFound";
import TutorDashboard from "../pages/TutorDashboard";
import Profile from "../pages/Profile";
import Verification from "../pages/Verification.jsx";
import RegisterTutor from "../pages/RegisterTutor.jsx";

function AuthRoutes() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Sidebar>
            <FindTutor />
          </Sidebar>
        }
      />
      <Route
        path="/chat"
        element={
          <Sidebar>
            <Chat />
          </Sidebar>
        }
      />
      <Route
        path="/profile"
        element={
          <Sidebar>
            <Profile />
          </Sidebar>
        }
      />
      <Route
        path="/verify"
        element={
          <Sidebar>
            <Verification />
          </Sidebar>
        }
      />
      <Route
        path="/tutor/dashboard"
        element={
          <Sidebar>
            <TutorDashboard/>
          </Sidebar>
        }
      />
      <Route
        path="/tutor"
        element={
          <Sidebar>
            <RegisterTutor/>
          </Sidebar>
        }
      />{" "}
      :
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoutes;
