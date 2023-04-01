import React from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import Login from '../pages/Login/Login.jsx';
import Register from '../pages/Register/Register.jsx';


const UnauthRoutes = () => (
    
    <Routes>
        <Route path="/" element={
            <Dashboard />
        } />
        <Route path="/register" element={
            <Register/>
        } />
        <Route path="/login" element={
           <Login/>
        } />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>

);

export default UnauthRoutes;