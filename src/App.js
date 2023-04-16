import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext';
import UnauthRoutes from "./routes/UnauthRoutes";
import AuthRoutes from "./routes/AuthRoutes";


function App() {

  const { state } = React.useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        {!state.isAuthenticated ?
          <UnauthRoutes />
          : <AuthRoutes />}
      </Router>
    </div>
  );
}

export default App;
