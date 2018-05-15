/* eslint-disable */
/* @flow */
import { AsyncStorage, Keyboard } from 'react-native';
import LunesLib from 'lunes-lib';
import types from 'lunesmobilewallet/app/config/types';
import { navigate } from 'lunesmobilewallet/app/config/routes';

const signinLoading = () => ({
  type: types.SIGNIN_LOADING,
});

const signinSuccess = user => ({
  type: types.SIGNIN_SUCCESS,
  user,
});

const signinError = error => ({
  type: types.SIGNIN_ERROR,
  error,
});

const requestLoading = () => ({
  type: types.REQUEST_LOADING,
});

const requestFinished = () => ({
  type: types.REQUEST_FINISHED,
});

const storeUser = user => ({
  type: types.STORE_USER,
  user,
});

const signupLoading = () => ({
  type: types.SIGNUP_LOADING,
});

const signupSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  user,
});

const signupError = (error = null) => ({
  type: types.SIGNUP_ERROR,
  error,
});

const signoutLoading = () => ({
  type: types.SIGNOUT_LOADING,
});

const signoutSuccess = () => ({
  type: types.SIGNOUT_SUCCESS,
});

const signoutError = error => ({
  type: types.SIGNOUT_ERROR,
  error,
});

const storeAddress = wallet => ({
  type: types.STORE_WALLET,
  wallet,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
  error: null,
});

export const redirectToPIN = () => dispatch => {
  try {
    dispatch(signinLoading());
    AsyncStorage.getItem('storedUser').then((storedUser: string) => {
      const user = JSON.parse(storedUser);
      dispatch(storeUser());
      dispatch(requestFinished());
      dispatch(signinSuccess(user));
      dispatch(storeUser(user));
      dispatch(storeAddress(user.wallet));
      if (user && !user.pinIsValidated) {
        navigate('PIN');
      } else {
        navigate('PIN', { isLogged: true });
      }
    });
  } catch (error) {
    dispatch(requestFinished());
    AsyncStorage.removeItem('storedUser');
    navigate('Signin');
    throw error;
  }
};

async function login(email, password, dispatch) {
  try {
    dispatch(signinLoading());
    const user = await LunesLib.users.login({ email, password });
    AsyncStorage.setItem('storedUser', JSON.stringify(user));
    dispatch(requestFinished());
    dispatch(signinSuccess(user));
    dispatch(storeUser(user));
    dispatch(storeAddress(user.wallet));
    Keyboard.dismiss();
    if (user && !user.pinIsValidated) {
      navigate('PIN');
    } else {
      navigate('PIN', { isLogged: true });
    }
  } catch (error) {
    dispatch(requestFinished());
    AsyncStorage.removeItem('storedUser');
    throw error;
  }
}

export const requestLogin = values => {
  return dispatch => {
    dispatch(requestLoading());
    login(values.email, values.password, dispatch).catch(error => {
      dispatch(requestFinished());
      dispatch(signinError(error));
      AsyncStorage.removeItem('storedUser');
      navigate('Signin');
    });
  };
};

async function createUser(userData, dispatch) {
  try {
    let user = await LunesLib.users.create(userData);
    if (user !== null) {
      user = { ...user, ...userData };
      delete user.password;
      dispatch(requestFinished());
      dispatch(signupSuccess(user));
      dispatch(storeUser(user));
      dispatch(storeAddress(user.wallet));
      navigate('PIN');
    } else {
      dispatch(signupError());
      AsyncStorage.removeItem('storedUser');
      navigate('Signin');
    }
  } catch (error) {
    dispatch(requestFinished());
    AsyncStorage.removeItem('storedUser');
    navigate('Signin');
    throw error;
  }
}

export const requestSignup = values => {
  const { name, email, password } = values;
  const userData = {
    fullname: name,
    password,
    email,
    photoUrl: '',
  };

  return dispatch => {
    dispatch(requestLoading());
    createUser(userData, dispatch).catch(error => {
      dispatch(requestFinished());
      dispatch(signupError(error));
      AsyncStorage.removeItem('storedUser');
      navigate('Signin');
    });
  };
};

export const requestSignout = user => dispatch => {
  try {
    dispatch(signoutLoading());
    LunesLib.users.logout(user.accessToken);
    AsyncStorage.removeItem('storedUser');
    dispatch(signoutSuccess());
    navigate('Signin');
  } catch (error) {
    dispatch(signoutError(error));
    AsyncStorage.removeItem('storedUser');
    navigate('Signin');
  }
};
