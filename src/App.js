import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Chat from "./pages/Chat.jsx";
import FindTutor from "./pages/FindTutor.jsx";
import NotFound from "./pages/NotFound";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
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
              <Route path="/" element={<Dashboard />} />
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
