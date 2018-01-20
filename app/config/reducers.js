import { AsyncStorage } from 'react-native';
import { combineReducers } from 'redux';
import tabsReducer from '../components/tabs/reducer';
import authReducer from '../screen/Signin/reducer';
import redirectToAuthReducer from '../screen/Introduction/reducer';
import confirmationReducer from '../screen/Confirmation/reducer';
import receivePaymentReducer from '../screen/ReceivePayment/reducer';
import sendPaymentReducer from '../screen/SendPayment/reducer';
import changePasswordReducer from '../screen/ChangePassword/reducer';
import profileReducer from '../screen/Profile/reducer';
import pinReducer from '../screen/PIN/reducer';

const reducers = combineReducers({
  tabsReducer,
  auth: authReducer,
  redirectToAuthReducer,
  authSMS: confirmationReducer,
  pinReducer,
  receivePaymentReducer,
  sendPaymentReducer,
  changePasswordReducer,
  profileReducer,
});

export default reducers;
