import React from "react";
import { authReducer, initialState } from "../reducers/AuthReducer";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
    
    const [state, dispatch] = React.useReducer(authReducer, initialState);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const tutor = localStorage.getItem('tutor');

        if (tutor != null) {
            dispatch({
                type: 'TUTOR',
                payload: {token}
            })
        } else

        if (token != null) {
            dispatch({
                type: 'LOGIN',
                payload: {token}
            })
        }
    }, [])

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