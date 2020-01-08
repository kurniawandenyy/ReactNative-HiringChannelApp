import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Auth';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      hasLogin: false,
    };
  }

  signup() {
    Actions.signup();
  }

  render() {
    // AsyncStorage.getItem('token', (_err, item) => {
    //   if (item.length > 0) {
    //     this.setState({hasLogin: true});
    //   }
    // });
    // return this.state.hasLogin ? (
    //   this.props.navigation.navigate('Engineers')
    // ) : (
    return (
      <View style={styles.container}>
        <Logo />

        <Form type="Login" navigation={this.props.navigation} />

        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Dont have an account yet?</Text>

          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupButton}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },

  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },

  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});
