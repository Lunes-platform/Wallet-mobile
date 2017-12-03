/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../styles/SideMenu';
import { ScrollView, View } from 'react-native';

import SideMenuItem from './SideMenuItem';
import SideMenuFooter from './SideMenuFooter';

class SideMenu extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <SideMenuItem
              screen={'LunesMarket'}
              menuOption={'Mercado Lunes'}
              navigation={navigation}
            />
          </View>
          <View>
            <SideMenuItem
              screen={'ValuesAlertSystem'}
              menuOption={'Sistema de Alerta de Valores'}
              navigation={navigation}
            />
          </View>
          <View>
            <SideMenuItem
              screen={'MultiCoinsSystem'}
              menuOption={'Sistema de Multi-Coins'}
              navigation={navigation}
            />
          </View>
          <View>
            <SideMenuItem
              screen={'CardManager'}
              menuOption={'Gestão de Gasto de Cartão'}
              navigation={navigation}
            />
          </View>
          <View>
            <SideMenuItem
              screen={'BoletoPayments'}
              menuOption={'Pagamento de Boletos'}
              navigation={navigation}
            />
          </View>
          <View>
            <SideMenuItem
              screen={'PhoneRecharges'}
              menuOption={'Recargas de Celular'}
              navigation={navigation}
            />
          </View>
        </ScrollView>
        <View>
          <SideMenuFooter />
        </View>
      </View>
    );
  }
}

export default SideMenu;
