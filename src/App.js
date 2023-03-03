import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Chat from './pages/Chat.jsx';
import FindTutor from './pages/FindTutor.jsx';

const App = () => {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/find-tutor" element={<FindTutor />} />
        </Routes>
      </Sidebar>
    </Router>
  );
};

export default App;
