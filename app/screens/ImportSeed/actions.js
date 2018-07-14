/* eslint-disable */
import { AsyncStorage } from 'react-native';
import types from '../../config/types';
import { coins, services, networks } from 'lunes-lib';
import { navigate } from '../../config/routes';
import * as StoreSeed from '../../utils/store-seed';

async function getBalance(address, currentUser, dispatch) {
  try {
    const balance = await services.wallet.lns.balance(address, networks.LNSTESTNET);
    dispatch(storeBalanceLNSOnUser(balance.data));
  } catch (error) {
    throw error;
  }
}

async function generateNewSeedWords(dispatch) {
  try {
    const newSeedWords = await services.wallet.mnemonic.generateMnemonic();
    dispatch(addNewSeedWords(newSeedWords));
  } catch (error) {
    throw error;
  }
}

async function generateAddressBySeedWords(
  seedWordsText,
  currentUser,
  dispatch
) {
  try {
    StoreSeed.store(seedWordsText);
    const addressGeneratedByMnemonic = await services.wallet.lns.wallet
      .newAddress(seedWordsText, networks.LNSTESTNET)
      .catch(error => {
        console.log(error);
      });
    AsyncStorage.setItem(
      'addressLunesUser',
      JSON.stringify(addressGeneratedByMnemonic)
    );
    dispatch(setSeedOnUserInfo(seedWordsText));
    dispatch(storeAddressOnDevice(addressGeneratedByMnemonic));
    dispatch(showSuccessOnImportSeed('SUCCESS_ON_GENERATE_ADDRESS'));
    getBalance(addressGeneratedByMnemonic, currentUser, dispatch).catch(
      error => {
        dispatch(requestFinished());
        navigate('Main');
      }
    );
    return;

    //dispatch(showErrorOnImportSeed('INVALID_WORDS'));
  } catch (error) {
    throw error;
  }
}

export const generateNewSeed = currentUser => dispatch => {
  generateNewSeedWords(dispatch).catch(error => {
    dispatch(showErrorOnImportSeed('ERROR_GENERATE_NEW_SEED'));
  });
};

export const importSeed = (seedWordsText, currentUser) => dispatch => {
  generateAddressBySeedWords(seedWordsText, currentUser, dispatch).catch(
    error => {
      dispatch(showErrorOnImportSeed('ERROR_ADDRESS_BY_SEED'));
    }
  );
};

export const closeAlert = () => dispatch => {
  dispatch(doCloseAlert());
};

export const clearSeedWords = () => ({
  type: types.CLEAR_SEED_WORDS,
});

const storeBalanceLNSOnUser = balanceLNS => ({
  type: types.STORE_BALANCE_LNS,
  balanceLNS,
});

const storeAddressOnDevice = address => ({
  type: types.STORE_ADDRESS_ON_DEVICE,
  address,
});

const addNewSeedWords = newSeedWords => ({
  type: types.NEW_SEED_WORD,
  newSeedWords,
});

const showSuccessOnImportSeed = msgSuccess => ({
  type: types.SUCCESS_TO_IMPORT_SEED,
  msgSuccess,
});

const showErrorOnImportSeed = msgError => ({
  type: types.ERROR_TO_IMPORT_SEED,
  msgError,
});

const doCloseAlert = () => ({
  type: types.CLOSE_ALERT,
});

const setSeedOnUserInfo = seed => ({
  type: types.SET_SEED_USER,
  seed,
});
