import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Chat from "../pages/Chat/Chat.jsx";
import FindTutor from "../pages/FindTutor.jsx";
import NotFound from "../pages/NotFound";
import TutorDashboard from "../pages/TutorDashboard";
import Profile from "../pages/Profile";
import RegisterTutorForm from "../components/registerTutorForm/RegisterTutorForm";
import Verification from "../pages/Verification.jsx"
import TutorScheduleForm from "../components/tutorScheduleForm/TutorScheduleForm";
import TutorDetail from '../pages/TutorDetail/TutorDetail.jsx';
import { AuthContext } from "../contexts/AuthContext";

function AuthRoutes() {
    const { state } = React.useContext(AuthContext);

    return (
        <Routes>
            <Route path="/chat" element={
                <Sidebar>
                    <FindTutor />
                </Sidebar>} />
            <Route path="/" element={<Chat />} />
            <Route
                path="/profile" element={
                    <Sidebar>
                        <Profile />
                    </Sidebar>} />
            <Route
                path="/verify" element={
                    <Sidebar>
                        <Verification />
                    </Sidebar>} />
            <Route
                path="/schedule" element={
                    <Sidebar>
                        <TutorScheduleForm />
                    </Sidebar>} />

            <Route path="/tutor" element={
                !state.isTutor ?
                    <RegisterTutorForm /> :
                    <Sidebar>
                        <TutorDashboard />
                    </Sidebar>
            } />
            <Route path="/tutor/:id" element={
                <TutorDetail />
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AuthRoutes;
