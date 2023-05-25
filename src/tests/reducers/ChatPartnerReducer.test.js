import { initialState, ChatPartnerReducer } from '../../reducers/ChatPartnerReducer';

it("should return the initial state", () => {
    expect(ChatPartnerReducer(initialState, {})).toEqual({
      chatId: "null",
      user: {},
      currentUser: null,
    });
  });

it("should handle the CHANGE_USER action case 1", () => {
    const payload = { uid: "1", name: "John" };
    const state = {chatId: "null",user: {},currentUser: {uid:"2"},}
    const result = ChatPartnerReducer(state, {
      type: "CHANGE_USER",
      payload,
    });
    console.log(result)
    expect(result.user).toEqual(payload);
    expect(typeof result.chatId).toBe("string")

    
  });
  it("should handle the CHANGE_USER action case 2", () => {
    const payload = { uid: "2", name: "John" };
    const state = {chatId: "null",user: {},currentUser: {uid:"1"},}
    const result = ChatPartnerReducer(state, {
      type: "CHANGE_USER",
      payload,
    });
    console.log(result)
    expect(result.user).toEqual(payload);
    expect(typeof result.chatId).toBe("string")

    
  });
it("should handle the SET_CURRENT_USER action", () => {
    const payload = { uid: "1", name: "John" };
    const result = ChatPartnerReducer(initialState, {
      type: "SET_CURRENT_USER",
      payload,
    });
    expect(result.currentUser).toEqual(payload);
  });