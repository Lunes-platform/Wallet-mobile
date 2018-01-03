import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import Swiper from './SwiperContainer';
import { navigate } from '../../config/routes';
import LunesLoading from '../../native-base-theme/components/LunesLoading';

export default class Introduction extends React.Component {
  componentWillMount() {
    StatusBar.setHidden(true);
    console.log(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.isViewedIntroduction) {
      navigate('Signin');
    }
  }

  renderSwiper() {
    return (
      <Swiper>
        {/* First screen */}
        <View style={[styles.slide2, { backgroundColor: '#4b2c82' }]}>
          <Image
            style={{ height: 300, width: 300 }}
            source={require('../../assets/images/bem-vindo.png')}
          />
          <Text style={styles.header}>SEJA BEM-VINDO!</Text>
          <Text style={styles.text}>
            Muito obrigado por escolher a Wallet Lunes como sua carteira
            multicoin. Aproveite da usabilidade e tecnologia desta incrível
            carteira e armazene suas criptomoedas com um alto nível de
            segurança.
          </Text>
        </View>
        {/* Second screen */}
        <View style={[styles.slide2, { backgroundColor: '#4b2c82' }]}>
          <Image
            style={{ height: 300, width: 300 }}
            source={require('../../assets/images/analytics.png')}
          />
          <Text style={styles.header}>ANALYTICS</Text>
          <Text style={styles.text}>
            Acompanhe os movimentos de altas e baixas do mercado de criptomoedas
            com nossos gráficos modernos e práticos.
          </Text>
        </View>
        {/* Third screen */}
        <View style={[styles.slide2, { backgroundColor: '#4b2c82' }]}>
          <Image
            style={{ height: 300, width: 300 }}
            source={require('../../assets/images/faca-backup.png')}
          />
          <Text style={styles.header}>FAÇA SEU BACKUP</Text>
          <Text style={styles.text}>
            Não armazenamos suas moedas em nossos servidores, elas são de sua
            propriedade e estão em sua posse, por isso não deixe de salvar as
            suas chaves privadas e fazer seu backup.
          </Text>
        </View>
        {/* Fourty screen */}
        <View style={[styles.slide2, { backgroundColor: '#4b2c82' }]}>
          <Image
            style={{ height: 300, width: 300 }}
            source={require('../../assets/images/compre-moedas.png')}
          />
          <Text style={styles.header}>COMPRE MOEDAS</Text>
          <Text style={styles.text}>
            Compre criptomoedas de forma rápida e segura, sem burocracia.
            Adicione créditos pagando por boleto bancário ou com o seu cartão de
            crédito.
          </Text>
        </View>
        {/* Fifty screen */}
        <View style={[styles.slide2, { backgroundColor: '#4b2c82' }]}>
          <Image
            style={{ height: 300, width: 320 }}
            source={require('../../assets/images/transferencia-moedas.png')}
          />
          <Text style={styles.header}>TRANSAÇÕES P2P</Text>
          <Text style={styles.text}>
            Receba e envie pagamentos de qualquer lugar do mundo, de forma
            rápida, segura e barata, direto de pessoa para pessoa.
          </Text>
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
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Offside-Regular',
    fontSize: 18,
    fontWeight: '400',
    color: '#4CD566',
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
