import React from "react";
import { authReducer, initialState } from "../reducers/AuthReducer";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;