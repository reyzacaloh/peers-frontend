import axios from "axios";
import React from "react";
import { authReducer, initialState } from "../reducers/AuthReducer";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
    
    const [state, dispatch] = React.useReducer(authReducer, initialState);
    const [tutor, setTutor] = React.useState({});
    
    const getTutor = async (token) => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/tutor_form/tutor/data`,
          {
            headers: {
              Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
            },
          }
        );
        setTutor(response.data?.tutor);
      };
    React.useEffect(() => {
        
        const token = localStorage.getItem('token');
        const isTutor = localStorage.getItem('tutor');
        if (isTutor) {
            dispatch({
                type: 'TUTOR',
                payload: {token: (token != null) ? token.replace(/['"]+/g, '') : null}
            })
        } else

        if (token != null) {
            dispatch({
                type: 'LOGIN',
                payload: {token: token.replace(/['"]+/g, '')}
            })
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
                tutor,
                setTutor,
                getTutor
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;