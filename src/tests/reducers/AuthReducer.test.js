import { authReducer, initialState } from '../../reducers/AuthReducer';


it('returns autheticated for successful login', () => {
  const updateAction = {type: 'LOGIN', payload: initialState };
  const updatedState = authReducer(initialState, updateAction);
  expect(updatedState).toEqual({isAuthenticated: true, user: null, token: null, isTutor: false});
});

it('returns isTutor true for successful Tutor dispatch', () => {
  const updateAction = {type: 'TUTOR', payload: initialState };
  const updatedState = authReducer(initialState, updateAction);
  expect(updatedState).toEqual({isAuthenticated: true, user: null, token: "null", isTutor: true});
  expect(localStorage.getItem("tutor")).toEqual("true")
});

it('returns not autheticated for unsuccessful login', () => {
  const updateAction = {type: '', payload: initialState };
  const updatedState = authReducer(initialState, updateAction);
  expect(updatedState).toEqual(initialState);
});

it('returns not autheticated for successful logout', () => {
  const updateAction = {type: 'LOGOUT', payload: initialState };
  const updatedState = authReducer(initialState, updateAction);
  expect(updatedState).toEqual(initialState);
});