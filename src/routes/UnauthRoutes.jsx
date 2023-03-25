import React from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import RegisterForm from "../components/registerForm/RegisterForm";
import Login from '../pages/Login/Login.jsx';


const UnauthRoutes = () => (
    
    <Routes>
        <Route path="/" element={
            <Dashboard />
        } />
        <Route path="/register" element={
            <RegisterForm />
        } />
        <Route path="/login" element={
           <Login/>
        } />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>

);

export default UnauthRoutes;