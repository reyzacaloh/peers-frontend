const initialState = {
    chatId: "null",
    user: {},
    currentUser: null,
  };
  
  const ChatPartnerReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          ...state,
          user: action.payload,
          chatId:state.currentUser.uid > action.payload.uid
              ? state.currentUser.uid + action.payload.uid
              : action.payload.uid + state.currentUser.uid,
        };
      case "SET_CURRENT_USER":
        return {
          ...state,
          currentUser: action.payload,
        };
      default:
        return state;
    }
  };
  
  
    export {initialState, ChatPartnerReducer}