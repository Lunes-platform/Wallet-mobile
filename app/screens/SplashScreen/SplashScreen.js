import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Logo } from '../../components';
import styles from './styles/SplashScreenStyle';

export default class SplashScreen extends Component {
  render() {
    return (
      <View>
        <Logo />
        <Text style={styles.loadingTxt}>Carregando...</Text>
      </View>
    );
  }
}
