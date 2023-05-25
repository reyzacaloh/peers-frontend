import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Chat from "../pages/Chat/Chat.jsx";
import FindTutor from "../pages/FindTutor.jsx";
import NotFound from "../pages/NotFound";
import TutorDashboard from "../pages/TutorDashboard";
import Profile from "../pages/Profile";
import RegisterTutor from "../pages/RegisterTutor.jsx";
import Verification from "../pages/Verification.jsx"
import TutorScheduleForm from "../components/tutorScheduleForm/TutorScheduleForm";
import TutorDetail from '../pages/TutorDetail/TutorDetail.jsx';
import Payment from "../pages/payment/Payment.jsx";
import EditPrice from "../components/editPrice/EditPrice";

function AuthRoutes() {

    return (
        <Routes>
            <Route path="/" element={
                <Sidebar>
                    <FindTutor />
                </Sidebar>} />
            <Route path="/chat" element={<Chat />} />
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
                <Sidebar>
                    <RegisterTutor /> 
                </Sidebar>
            } />
            <Route path="/tutor/dashboard" element={
                <Sidebar>
                    <TutorDashboard />
                </Sidebar>
            } />
            <Route path="/tutor/:id" element={
                <TutorDetail />
            } />
            <Route path="/tutor/add-schedule" element={
                <TutorScheduleForm />
            } />
            <Route path="/tutor/edit-price" element={
                <EditPrice />
            } />

            <Route
                path="/payment" element={
                    <Sidebar>
                        <Payment />
                    </Sidebar>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AuthRoutes;
