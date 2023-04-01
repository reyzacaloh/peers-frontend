const initialState = {
    isAuthenticated: false,
    isTutor: false,
    user: null,
    token: null,
    };

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                ...state,
                isAuthenticated: true,
                isTutor: false,
                token: action.payload.token,
            };
        case "TUTOR":
            localStorage.setItem("tutor", "true");
            return {
                ...state,
                isAuthenticated: true,
                isTutor: true,
                token: localStorage.getItem("token"),
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                isTutor: false,
                token : null
            };
        default:
            return state;
    }
};

export { initialState, authReducer };