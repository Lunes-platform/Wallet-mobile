import types from './types';

const initialState = {
  authorized: null,
  loading: false,
  error: '',
  trySignin: false,
  trySignup: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.REQUEST_FINISHED:
      return {
        ...state,
        loading: false,
      };
    // SIGNIN
    case types.SIGNIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: true,
        user: action.payload,
      };
    case types.SIGNIN_ERROR:
      return {
        ...state,
        loading: false,
        authorized: false,
        user: false,
      };
    //SIGNUP
    case types.SIGNUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: true,
        user: action.user,
      };
    case types.SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        authorized: false,
        user: false,
        error: action.error,
      };
    //SIGNOUT
    case types.SIGNOUT_LOADING:
      return { ...state, loading: true };
    case types.SIGNOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: false,
        user: false,
      };
    case types.SIGNOUT_ERROR:
      return {
        ...state,
        loading: false,
        authorized: false,
        user: false,
      };
    case types.TRY_SIGNIN:
      return {
        ...state,
        trySignin: true,
      };
    default:
      return state;
  }
};

export default authReducer;
