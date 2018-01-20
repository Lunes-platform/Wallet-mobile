import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import BosonColors from '../variables/bosonColor';

const LunesBalanceText = ({ balance }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerInline}>
        <Image
          style={{ width: 20, height: 25 }}
          source={require('../../assets/images/lunes-token-coin.png')}
        />
        <Text style={styles.text}>{balance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  containerInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default LunesBalanceText;
