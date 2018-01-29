// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  requestCode,
  confirmCode,
  clearErrorNumberInvalid,
  clearError,
} from './actions';

import Confirmation from './ConfirmationComponent';

const mapStateToProps = state => {
  return {
    auth: state.auth,
    authSMS: state.authSMS,
    user: state.auth.user,
    loading: state.authSMS.loading,
    error: state.authSMS.error,
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { requestCode, confirmCode, clearErrorNumberInvalid, clearError },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
