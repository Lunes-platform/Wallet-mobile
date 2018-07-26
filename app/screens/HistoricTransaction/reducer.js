import types from '../../config/types';

const initialState = {
  loading: false,
  error: '',
  history: [],
};

const historicTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_HISTORIC:
      return { ...state, history: [] };
    case types.CLEAR_ALL_INFO:
      return initialState;
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
    case types.HISTORIC_TRANSACTION:
      return {
        ...state,
        history: action.history,
      };
    default:
      return state;
  }
};

export default historicTransactionReducer;
