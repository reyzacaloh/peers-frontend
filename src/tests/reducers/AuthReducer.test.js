import { authReducer, initialState } from '../../reducers/AuthReducer';


it('returns autheticated for successful login', () => {
  const updateAction = {type: 'LOGIN', payload: initialState };
  const updatedState = authReducer(initialState, updateAction);
  expect(updatedState).toEqual({isAuthenticated: true, user: null, token: null});
});

it('returns not autheticated for unsuccessful login', () => {
  const updateAction = {type: '', payload: initialState };
  const updatedState = authReducer(initialState, updateAction);
  expect(updatedState).toEqual(initialState);
});