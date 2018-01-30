import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Container } from 'native-base';
import I18N from '../../i18n/i18n';
import Swiper from './SwiperContainer';
import { navigate } from '../../config/routes';
import LunesLoading from '../../native-base-theme/components/LunesLoading';
import LunesCodeSMS from '../../native-base-theme/components/LunesCodeSMS';

export default class Introduction extends React.Component {
  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentWillReceiveProps(props) {
    if (props.isViewedIntroduction) {
      //navigate('Signin');
    }
  }

  renderSwiper() {
    return (
      <Swiper>
        {/* First screen */}
        <View style={[styles.slide2, { backgroundColor: '#4b2c82' }]}>
          <Image
            style={{ height: 300, width: 300 }}
            source={{
              uri:
                'http://res.cloudinary.com/luneswallet/image/upload/c_scale,w_397/v1515019717/bem-vindo.png',
            }}
          />
          <Text style={styles.header}>{I18N.t('WELCOME')}</Text>
          <Text style={styles.text}>{I18N.t('WELCOME_MSG')}</Text>
        </View>
        {/* Second screen */}
        <View style={[styles.slide2, { backgroundColor: '#4b2c82' }]}>
          <Image
            style={{ height: 300, width: 300 }}
            source={{
              uri:
                'http://res.cloudinary.com/luneswallet/image/upload/c_scale,w_397/v1515019717/analytics.png',
            }}
          />
          <Text style={styles.header}>{I18N.t('ANALYTICS')}</Text>
          <Text style={styles.text}>{I18N.t('ANALYTICS_MSG')}</Text>
        </View>
        {/* Third screen */}
        <View style={[styles.slide2, { backgroundColor: '#4b2c82' }]}>
          <Image
            style={{ height: 300, width: 320 }}
            source={{
              uri:
                'http://res.cloudinary.com/luneswallet/image/upload/c_scale,w_300/v1515019717/faca-backup.png',
            }}
          />
          <Text style={styles.header}>{I18N.t('DO_YOUR_BACKUP')}</Text>
          <Text style={styles.text}>{I18N.t('DO_YOUR_BACKUP_MSG')}</Text>
        </View>
        {/* Fourty screen */}
        <View style={[styles.slide2, { backgroundColor: '#4b2c82' }]}>
          <Image
            style={{ height: 300, width: 300 }}
            source={{
              uri:
                'http://res.cloudinary.com/luneswallet/image/upload/c_scale,w_397/v1515019717/compre-moedas.png',
            }}
          />
          <Text style={styles.header}>{I18N.t('BUY_COINS')}</Text>
          <Text style={styles.text}>{I18N.t('BUY_COINS_MSG')}</Text>
        </View>
        {/* Fifty screen */}
        <View style={[styles.slide2, { backgroundColor: '#4b2c82' }]}>
          <Image
            style={{ height: 300, width: 300 }}
            source={{
              uri:
                'http://res.cloudinary.com/luneswallet/image/upload/c_scale,w_390/v1515019717/transferencia-moedas.png',
            }}
          />
          <Text style={styles.header}>{I18N.t('TRANSACTIONS_P2P')}</Text>
          <Text style={styles.text}>{I18N.t('TRANSACTIONS_P2P_MSG')}</Text>
        </View>
      </Swiper>
    );
  }

  renderSpinner() {
    return <LunesLoading />;
  }

  render() {
    return this.renderSwiper();
  }
}

const styles = StyleSheet.create({
  // Slide2 styles
  slide2: {
    flex: 2, // Take up all screen
    justifyContent: 'flex-start', // Center vertically
    alignItems: 'center', // Center horizontally
    paddingTop: 15,
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Offside-Regular',
    fontSize: 18,
    fontWeight: '400',
    color: '#4CD566',
    marginTop: 5,
    marginBottom: 5,
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});
