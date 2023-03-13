const initialState = {
    isAuthenticated: false,
    isTutor: false,
    user: null,
    token: null,
    };

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            localStorage.setItem("isTutor", action.payload.isTutor);
            return {
                ...state,
                isAuthenticated: true,
                isTutor: action.payload.isTutor,
                user: action.payload.user,
                token: action.payload.token,
            };
        default:
            return state;
    }
};

export { initialState, authReducer };