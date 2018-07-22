/* eslint-disable */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from 'react-native';

import { Container, Spinner, Text, Button } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import LunesAlert from '../../native-base-theme/components/LunesAlert';
import I18N from '../../i18n/i18n';
import bosonColor from '../../native-base-theme/variables/bosonColor';
import { navigate } from '../../config/routes';

// CONVERT DECIMALS
import { MoneyClass } from '../../utils/moneyConvert';
import { numeral } from '../../utils/numeral';

const money = new MoneyClass();

const { width, height } = Dimensions.get('window');
const widthSpacePadding = width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: widthSpacePadding,
    padding: 8,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: bosonColor.$bosonDarkPurple,
  },
  footer: {
    marginTop: 16,
  },
  containerScroll: {
    width: widthSpacePadding,
  },
  boxLeasing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  emptyTransactions: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  lunesAmount: {
    color: bosonColor.$bosonLightGreen,
    fontWeight: 'bold',
  },
  btCancel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Leasing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderError = () => {
    const { isShowError } = this.props;
    if (isShowError) {
      return (
        <LunesAlert
          isShow={isShowError}
          type="error"
          showCloseIcon={true}
          onClose={() => {
            this.props.closeAlert();
          }}
          onPressConfirmation={() => {
            this.props.closeAlert();
          }}
          title={I18N.t('ERROR')}
          message={I18N.t('ERROR_ON_CANCEL_LEASE')}
          textConfirmation={I18N.t('OK')}
        />
      );
    }
    return null;
  };

  renderSuccess = () => {
    const { isShowSuccess } = this.props;
    if (isShowSuccess) {
      return (
        <LunesAlert
          isShow={isShowSuccess}
          type="success"
          showCloseIcon={true}
          onClose={() => {
            this.props.closeAlert();
            //navigate('Leasing');
          }}
          onPressConfirmation={() => {
            this.props.closeAlert();
            //navigate('Leasing');
          }}
          title={I18N.t('SUCCESS')}
          message={I18N.t('SUCCESS_ON_CANCEL_LEASE')}
          textConfirmation={I18N.t('OK')}
        />
      );
    }
    return null;
  };

  doCancelLeasing = txid => {
    Alert.alert(
      I18N.t('CONFIRM_CANCEL_LEASE_TITLE'),
      I18N.t('CONFIRM_CANCEL_LEASE_TEXT'),
      [
        {
          text: I18N.t('CANCEL'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: I18N.t('CONFIRM'),
          onPress: () => {
            this.props.cancelLeasing({
              key: txid,
              address: this.props.balance.LNS.address,
              balance: this.props.userBalance,
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  componentDidMount = () => {
    this.loadLeasing();
  };

  componentWillMount = () => {};

  loadLeasing = () => {
    this.props.getLeasingHistory({ address: this.props.balance.LNS.address });
    this.props.getLeasingValue({
      address: this.props.balance.LNS.address,
      balance: this.props.userBalance,
    });
  };

  normalizeStatus = status => {
    if (status === 'active') {
      return true;
    }
    return false;
  };

  buttonCancel = (status, id, type) => {
    if (type === 8) {
      if (status) {
        return (
          // icon cancel
          <TouchableOpacity
            onPress={() => {
              this.doCancelLeasing(id);
            }}
            style={styles.btCancel}>
            <View>
              <FontAwesomeIcon name={'cogs'} size={28} color={'#fff'} />
            </View>
          </TouchableOpacity>
        );
      }

      return (
        // icon canceled
        <TouchableOpacity style={styles.btCancel}>
          <View>
            <FontAwesomeIcon name={'ban'} size={28} color={'#fff'} />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  formatStyleLunes = val => {
    return numeral(money.conevertCoin('btc', val)).format('0,0.00000000');
  };

  renderList = () => {
    if (!this.props.list) return;
    if (this.props.list.length === 0) return;

    return this.props.list.map((obj, index) => {
      const nativeAmount = this.formatStyleLunes(obj.nativeAmount);
      const status = this.normalizeStatus(obj.otherParams.status);

      return (
        <View
          style={[styles.boxLeasing, !status ? { opacity: 0.2 } : {}]}
          key={index}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: '#fff', fontSize: 10 }}>
              {new Date(obj.date).toLocaleDateString()}
            </Text>
            <Text
              style={{ color: '#fff', fontSize: 12 }}
              onPress={() => {
                Linking.openURL(
                  `https://blockexplorer.lunes.io/tx/${obj.txid}`
                );
              }}>
              {`${obj.txid.substring(0, 25)}...`}
            </Text>
            <Text style={styles.lunesAmount}>{nativeAmount} LUNES</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            {this.buttonCancel(status, obj.txid, obj.otherParams.type)}
          </View>
        </View>
      );
    });
  };

  renderSpinner = () => {
    if (this.props.loading) {
      return <Spinner />;
    } else if (
      this.props.list.length === 0 ||
      this.props.list === undefined ||
      this.props.list === false
    ) {
      return this.renderEmptyBlock();
    }
    return null;
  };

  renderEmptyBlock = () => {
    return (
      <View style={styles.emptyTransactions}>
        <FontAwesomeIcon name={'list-alt'} size={40} color={'#fff'} />
        <Text style={{ marginTop: 20 }}>{I18N.t('EMPTY_TRANSACTION')}</Text>
      </View>
    );
  };

  renderBtStartLeasing = () => {
    if (!this.props.resume.availableBalance) return;
    if (this.props.resume.availableBalance <= 0) return;
    return (
      <Button
        rounded
        block
        success
        onPress={() => navigate('LeasingStart')}
        style={{ width: widthSpacePadding, elevation: 0 }}>
        <Text>{I18N.t('LEASING_BT_START')}</Text>
      </Button>
    );
  };

  render() {
    return (
      <Container>
        {this.renderError()}
        {this.renderSuccess()}
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 10 }}>
                {I18N.t('LEASING_TITLE_AVAILABLE')}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  color: bosonColor.$bosonLightGreen,
                }}>
                {numeral(this.props.resume.availableBalance).format(
                  '0,0.00000000'
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{ fontSize: 10, opacity: 0.5 }}>
                  {I18N.t('LEASING_TITLE_LEASING')}
                </Text>
                <Text>
                  {numeral(this.props.resume.leaseBalance).format(
                    '0,0.00000000'
                  )}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 10, opacity: 0.5 }}>
                  {I18N.t('LEASING_TITLE_TOTAL')}
                </Text>
                <Text>
                  {numeral(this.props.resume.totalBalance).format(
                    '0,0.00000000'
                  )}
                </Text>
              </View>
            </View>
          </View>

          <ScrollView style={styles.containerScroll}>
            {this.renderSpinner()}
            {this.renderList()}
          </ScrollView>

          <View style={styles.footer}>{this.renderBtStartLeasing()}</View>
        </View>
      </Container>
    );
  }
}
