/* eslint-disable */
// @flow

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import BosonColors from './../variables/bosonColor';
import { LunesIconKey } from '../../native-base-theme/components/LunesCustomIcon';
import I18N from '../../i18n/i18n';

export default class LunesPIN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue1: '',
      inputValue2: '',
      inputValue3: '',
      inputValue4: '',
      mask1: '',
      mask2: '',
      mask3: '',
      mask4: '',
      enablePIN: false,
    };
  }

  onChangeInputValue(index) {
    if (this.state.inputValue1 === '') {
      this.setState({ inputValue1: index.toString(), mask1: '*' });
    } else if (this.state.inputValue2 === '') {
      this.setState({ inputValue2: index.toString(), mask2: '*' });
    } else if (this.state.inputValue3 === '') {
      this.setState({ inputValue3: index.toString(), mask3: '*' });
    } else if (this.state.inputValue4 === '') {
      this.setState({ inputValue4: index.toString(), mask4: '*' });
      this.state.enablePIN = true;
    }
  }

  onDeleteInputValue() {
    if (this.state.inputValue4 !== '') {
      this.setState({ inputValue4: '', mask4: '' });
      this.state.enablePIN = false;
    } else if (this.state.inputValue3 !== '') {
      this.setState({ inputValue3: '', mask3: '' });
    } else if (this.state.inputValue2 !== '') {
      this.setState({ inputValue2: '', mask2: '' });
    } else if (this.state.inputValue1 !== '') {
      this.setState({ inputValue1: '', mask1: '' });
    }
  }

  onSavePIN() {
    if (!this.props.onSavePIN) {
      console.error('you need pass onSavePIN as a function to props');
      return;
    }
    if (typeof this.props.onSavePIN === 'function') {
      const { inputValue1, inputValue2, inputValue3, inputValue4 } = this.state;
      const PIN = `${inputValue1}${inputValue2}${inputValue3}${inputValue4}`;
      if (PIN === '') {
        alert(I18N.t('PIN_IS_REQUIRED'));
        return;
      } else if (isNaN(parseInt(PIN))) {
        alert(I18N.t('ERROR_ON_SAVE_PIN'));
        return;
      }
      this.props.onSavePIN(PIN);
    }
  }

  renderInput1() {
    if (this.state.mask1 !== '') {
      return (
        <TextInput
          key="01"
          maxLength={1}
          style={styles.input}
          editable={false}
          underlineColorAndroid={BosonColors.$bosonWhite}
          value={'*'}
        />
      );
    }
    return (
      <TextInput
        key="01"
        maxLength={1}
        style={styles.input}
        editable={false}
        underlineColorAndroid={BosonColors.$bosonWhite}
        value={''}
      />
    );
  }

  renderInput2() {
    if (this.state.mask2 !== '') {
      return (
        <TextInput
          key="02"
          maxLength={1}
          style={styles.input}
          editable={false}
          underlineColorAndroid={BosonColors.$bosonWhite}
          value={'*'}
        />
      );
    }
    return (
      <TextInput
        key="02"
        maxLength={1}
        style={styles.input}
        editable={false}
        underlineColorAndroid={BosonColors.$bosonWhite}
        value={''}
      />
    );
  }

  renderInput3() {
    if (this.state.mask3 !== '') {
      return (
        <TextInput
          key="03"
          maxLength={1}
          style={styles.input}
          editable={false}
          underlineColorAndroid={BosonColors.$bosonWhite}
          value={'*'}
        />
      );
    }
    return (
      <TextInput
        key="03"
        maxLength={1}
        style={styles.input}
        editable={false}
        underlineColorAndroid={BosonColors.$bosonWhite}
        value={''}
      />
    );
  }

  renderInput4() {
    if (this.state.mask4 !== '') {
      return (
        <TextInput
          key="04"
          maxLength={1}
          style={styles.input}
          editable={false}
          underlineColorAndroid={BosonColors.$bosonWhite}
          value={'*'}
        />
      );
    }
    return (
      <TextInput
        key="04"
        maxLength={1}
        style={styles.input}
        editable={false}
        underlineColorAndroid={BosonColors.$bosonWhite}
        value={''}
      />
    );
  }

  renderKeyboardGreen() {
    if (
      this.state.inputValue1 &&
      this.state.inputValue2 &&
      this.state.inputValue3 &&
      this.state.inputValue4
    ) {
      return { color: BosonColors.$bosonLightGreen };
    }
    return {};
  }

  renderKeyboardInput(position) {
    return (
      <TouchableOpacity
        key={position}
        style={styles.viewKeyboardInput}
        onPress={() => {
          this.onChangeInputValue(position);
        }}>
        <Text style={[styles.keyboardInput, this.renderKeyboardGreen()]}>
          {position}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <LunesIconKey size={50} color={'#fff'} />
          </View>
          <View>
            <Text style={styles.instructions}>
              {I18N.t('TYPE_PIN_CODE')}{' '}
              {this.props.toValidate ? I18N.t('VALIDATE') : I18N.t('SIGNUP')}{' '}
              {I18N.t('YOUR_PIN')}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {this.renderInput1()}
            {this.renderInput2()}
            {this.renderInput3()}
            {this.renderInput4()}
          </View>
        </View>

        <View
          style={[
            styles.container,
            { width: Dimensions.get('window').width - 50 },
          ]}>
          <View style={styles.row}>
            <View style={[styles.box]}>{this.renderKeyboardInput(1)}</View>
            <View style={[styles.box]}>{this.renderKeyboardInput(2)}</View>
            <View style={[styles.box]}>{this.renderKeyboardInput(3)}</View>
          </View>

          <View style={styles.row}>
            <View style={[styles.box]}>{this.renderKeyboardInput(4)}</View>
            <View style={[styles.box]}>{this.renderKeyboardInput(5)}</View>
            <View style={[styles.box]}>{this.renderKeyboardInput(6)}</View>
          </View>

          <View style={styles.row}>
            <View style={[styles.box]}>{this.renderKeyboardInput(7)}</View>
            <View style={[styles.box]}>{this.renderKeyboardInput(8)}</View>
            <View style={[styles.box]}>{this.renderKeyboardInput(9)}</View>
          </View>

          <View style={styles.row}>
            <View style={[styles.box]}>
              <TouchableOpacity
                onPress={() => {
                  this.onDeleteInputValue();
                }}>
                <Entypo
                  name="erase"
                  size={25}
                  color={BosonColors.$bosonLightGreen}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.box]}>{this.renderKeyboardInput(0)}</View>
            <View style={[styles.box]}>
              <TouchableOpacity
                onPress={() => {
                  this.state.enablePIN ? this.onSavePIN() : null;
                }}>
                <Ionicons
                  name="ios-arrow-dropright-circle"
                  size={35}
                  style={this.state.enablePIN ? styles.buttonEnabled : styles.buttonEnabled}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  instructions: {
    width: 200,
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 25,
    padding: 10,
    color: BosonColors.$bosonWhite,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  viewKeyboardInput: {
    width: 40,
    height: 60,
  },
  keyboardInput: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  },
  input: {
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  box: {
    height: 40,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    color: '#626262',
  },
  buttonEnabled: {
    color: BosonColors.$bosonLightGreen,
  },
});
