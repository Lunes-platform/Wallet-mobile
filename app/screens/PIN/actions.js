/* eslint-disable */
import { AsyncStorage } from 'react-native';
import LunesLib from 'lunes-lib';
import types from '../../config/types';
import { navigate } from '../../config/routes';
import * as StoreSeed from '../../utils/store-seed';
import GeneralConstants from '../../constants/general';
import {
  prepareObjectWallet,
  getAddressAndBalance,
} from '../../utils/balance-utils';

async function generateAddress(currentUser, dispatch) {
  try {
    const seed = await StoreSeed.retrieveSeed();
    if (seed) {
      dispatch(setSeedOnUserInfo(seed));

      currentUser.wallet = await prepareObjectWallet(seed, currentUser).catch(
        error => {
          return null;
        }
      );

      if (!currentUser.wallet) {
        alert('error on prepare wallet');
        return;
      }

      getBalance(currentUser.wallet.coin, currentUser, dispatch).catch(
        error => {
          dispatch(requestFinished());
          navigate(GeneralConstants.SCREEN_NAMES.main);
        }
      );
    } else {
      dispatch(requestFinished());
      navigate(GeneralConstants.SCREEN_NAMES.importSeed);
    }
  } catch (error) {
    throw error;
  }
}

async function getBalance(walletCoins, currentUser, dispatch) {
  try {
    const addressAndBalance = await getAddressAndBalance(walletCoins);
    dispatch(confirmSuccess(currentUser));
    dispatch(storeBalanceOnUser(addressAndBalance));
    dispatch(requestFinished());
    navigate(GeneralConstants.SCREEN_NAMES.main);
  } catch (error) {
    dispatch(requestFinished());
    throw error;
  }
}

async function createPin(pin, currentUser, dispatch) {
  try {
    const pinCreated = await LunesLib.users.createPin(
      { pin },
      currentUser.accessToken
    );
    currentUser.pinIsValidated = true;
    const addressGeneratedByMnemonic = await generateAddress(
      currentUser,
      dispatch
    );
    if (!addressGeneratedByMnemonic) {
      dispatch(requestFinished());
      return;
    }
    getBalance(addressGeneratedByMnemonic, currentUser, dispatch).catch(
      error => {
        dispatch(requestFinished());
        navigate(GeneralConstants.SCREEN_NAMES.main);
      }
    );

    dispatch(requestFinished());
    dispatch(showDialogBackupSeed(currentUser.wallet.hash));
  } catch (error) {
    dispatch(requestFinished());
    AsyncStorage.removeItem(GeneralConstants.STORAGE.storedUser);
    navigate(GeneralConstants.SCREEN_NAMES.signin);
  }
}

async function confirmPin(pin, currentUser, wordSeedWasViewed, dispatch) {
  try {
    const pinConfirmed = await LunesLib.users.confirmPin(
      { pin },
      currentUser.accessToken
    );
    currentUser.pinIsValidated = true;
    currentUser.wordSeedWasViewed = wordSeedWasViewed;
    try {
      generateAddress(currentUser, dispatch).catch(error => {
        dispatch(requestFinished());
        alert('error on generate address');
      });
    } catch (error) {
      dispatch(requestFinished());
      AsyncStorage.removeItem(GeneralConstants.STORAGE.storedUser);
      navigate(GeneralConstants.SCREEN_NAMES.signin);
    }
  } catch (error) {
    dispatch(requestFinished());
    throw error;
  }
}

export const requestAddPIN = (PIN, currentUser) => dispatch => {
  dispatch(requestLoading());
  createPin(PIN, currentUser, dispatch).catch(error => {
    dispatch(requestFinished());
    dispatch(showError(error));
  });
};

export const requestValidPIN = (
  PIN,
  currentUser,
  wordSeedWasViewed
) => dispatch => {
  dispatch(requestLoading());
  confirmPin(PIN, currentUser, wordSeedWasViewed, dispatch).catch(error => {
    dispatch(requestFinished());
    dispatch(showError(error));
    AsyncStorage.removeItem(GeneralConstants.STORAGE.storedUser);
    navigate(GeneralConstants.SCREEN_NAMES.signin);
  });
};

// Aqui mostra o diloag com a seed word
export const showTextBackupSeedAction = seedText => ({
  type: types.SHOW_TEXT_BACKUP_SEED,
  seedText,
});

export const closeTextBackupSeedAction = () => ({
  type: types.CLOSE_TEXT_BACKUP_SEED,
});

const setSeedOnUserInfo = seed => ({
  type: types.SET_SEED_USER,
  seed,
});

const requestLoading = () => ({
  type: types.REQUEST_LOADING,
});

const requestFinished = () => ({
  type: types.REQUEST_FINISHED,
});

const showError = error => ({
  type: types.SHOW_ERROR,
  error,
});

// Aqui mostra o diloag informando que é importante ele efetuar o backup
const showDialogBackupSeed = seedText => ({
  type: types.SHOW_DIALOG_BACKUP_SEED,
  seedText,
});

export const closeShowDialogBackupSeed = () => ({
  type: types.CLOSE_DIALOG_BACKUP_SEED,
});

const confirmSuccess = user => ({
  type: types.CONFIRM_CODE_SUCCESS,
  user,
});

const storeBalanceOnUser = balance => ({
  type: types.STORE_BALANCE,
  balance,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
  error: null,
});
