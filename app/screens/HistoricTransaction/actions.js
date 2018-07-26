/* eslint-disable */
import { coins } from 'lunes-lib';
import types from '../../config/types';
import generalConstant from '../../constants/general';

const requestLoading = () => ({
  type: types.REQUEST_LOADING,
});

const requestFinished = () => ({
  type: types.REQUEST_FINISHED,
});

const showTransactions = data => ({
  type: types.HISTORIC_TRANSACTION,
  history: data.history,
});

const selectCoin = currentCoinSelected => ({
  type: types.CURRENT_COIN_SELECTED,
  currentCoinSelected,
});

const clearHistoric = () => ({
  type: types.CLEAR_HISTORIC,
});

async function _getHistoric(user, balance, currentCoinSelected, dispatch) {
  try {
    const address = balance[currentCoinSelected].address;
    const historicTransactions = await coins.services.history({
      address: address,
      network: currentCoinSelected,
      testnet: generalConstant.TESTNET,
    });
    dispatch(requestFinished());
    if (historicTransactions && historicTransactions.data) {
      dispatch(showTransactions(historicTransactions.data));
    }
  } catch (error) {
    dispatch(requestFinished());
    throw new Error(error);
  }
}

export const getHistoric = (user, balance, currentCoinSelected) => dispatch => {
  dispatch(requestLoading());
  _getHistoric(user, balance, currentCoinSelected, dispatch).catch(error => {
    dispatch(requestFinished());
    console.log(error);
  });
};

export const doAction = (user, balance, currentCoinSelected) => dispatch => {
  dispatch(requestLoading());
  dispatch(selectCoin(currentCoinSelected));
  dispatch(clearHistoric());
  _getHistoric(user, balance, currentCoinSelected, dispatch).catch(error => {
    dispatch(requestFinished());
    console.log(error);
  });
};
