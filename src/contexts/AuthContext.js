import React from "react";
import { authReducer, initialState } from "../reducers/AuthReducer";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const [tutor, setTutor] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const isTutor = localStorage.getItem("tutor");
    if (isTutor !== null) {
      dispatch({
        type: "TUTOR",
        payload: { token: token != null ? token.replace(/['"]+/g, "") : null },
      });
    } else if (token !== null) {
      dispatch({
        type: "LOGIN",
        payload: { token: token.replace(/['"]+/g, "") },
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        tutor,
        setTutor,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
