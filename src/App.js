import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Chat from "./pages/Chat.jsx";
import FindTutor from "./pages/FindTutor.jsx";
import NotFound from "./pages/NotFound";
import { authReducer, initialState } from "./reducers/AuthReducer";


export const AuthContext = React.createContext();

function App() {

  const [state, dispatch] = React.useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="App">
        <Router>
          {!state.isAuthenticated ? (
            <Routes>
              <Route path="/" element={
                  <Dashboard/>
              } />
              <Route path="/register" element={
                // TODO(Raka): Change the Dashboard Page to Register Page
                <Dashboard />
              } />
              <Route path="/login" element={
                // TODO(Azka): Change the Dashboard Page to Login Page
                <Dashboard />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
