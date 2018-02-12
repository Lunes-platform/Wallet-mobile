// @flow
import React from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  BackHandler,
  Platform,
  NetInfo,
} from 'react-native';
import { Container, Button, Text, Tab, Tabs } from 'native-base';
import LunesLogo from '../../native-base-theme/components/LunesLogo';
import LunesLoginForm from '../../native-base-theme/components/LunesLoginForm';
import LunesLoading from '../../native-base-theme/components/LunesLoading';
import I18n from '../../i18n/i18n';
import { navigate } from '../../config/routes';
import { handleErrors } from '../../utils/stringUtils';
import generalConstant from '../../constants/general';

// Keep a reference to ensure there is only one event listener
// subscribed with BackHandler
let listener = null;

// Default behavior: returning true to not exits the app.
let backButtonPressFunction = () => true;

export default class Signin extends React.Component<{}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { error } = this.props;
    if (Platform.OS == 'android' && listener == null) {
      listener = BackHandler.addEventListener('hardwareBackPress', function() {
        return backButtonPressFunction();
      });
    }
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.networkConnectionChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.networkConnectionChange
    );
  }

  networkConnectionChange = isConnected => {
    this.props.updateConnectionStatus(isConnected);
  };

  renderError() {
    const { error, clearError } = this.props;
    return handleErrors(error, clearError, clearError);
  }

  renderLoading() {
    return <LunesLoading />;
  }

  redirectToChangePassword() {
    navigate('ChangePassword');
  }

  render() {
    return (
      <Container>
        {this.props.loading ? this.renderLoading() : null}
        {this.renderError()}

        <ScrollView style={{ width: Dimensions.get('window').width - 50 }}>
          <View style={{ marginTop: 20 }}>
            <LunesLogo size={50} />
          </View>

          <Tabs initialPage={0}>
            <Tab heading={I18n.t('SIGNIN')}>
              <LunesLoginForm
                submit={this.props.requestLogin}
                modeAuth="SIGNIN"
              />
              <Button
                block
                transparent
                light
                style={{ marginTop: 30 }}
                onPress={() => {
                  this.redirectToChangePassword();
                }}>
                <Text style={{ fontSize: 12 }}>
                  {I18n.t('CHANGE_PASSWORD')}
                </Text>
              </Button>
            </Tab>
            <Tab heading={I18n.t('SIGNUP')}>
              <LunesLoginForm
                submit={this.props.requestSignup}
                modeAuth="SIGNUP"
              />
            </Tab>
          </Tabs>

          <View>
            <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 30 }}>
              {I18n.t('VERSION')} {generalConstant.VERSION_NAME}
            </Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
