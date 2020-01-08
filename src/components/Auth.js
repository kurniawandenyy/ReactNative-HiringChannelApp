import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Item, Picker, Icon} from 'native-base';
import {connect} from 'react-redux';
import {Register, Login, getSession} from '../redux/actions/auth';
import AwesomeAlerts from 'react-native-awesome-alerts';
import {Actions} from 'react-native-router-flux';
import config from '../../config';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      email: '',
      password: '',
      name: '',
      type: this.props.type,
      showAlert: false,
      message: '',
      color: '',
    };
  }
  onValueChange = role => {
    this.setState({
      role: role,
    });
  };
  onRegister = e => {
    e.preventDefault();
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };
    this.props
      .post(config.API_URL + '/auth/register', data)
      .then(() => {
        this.setState({
          message: 'Register Success!',
          showAlert: true,
          color: '#29B6F6',
        });
      })
      .catch(() => {
        this.setState({
          showAlert: true,
          message: 'Register Failed!',
          color: '#E53935',
        });
      });
  };

  storedata = async token => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log('error');
    }
  };

  onLogin = async e => {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props
      .login(config.API_URL + '/auth/login', data)
      .then(() => {
        this.props.Auth.role === 'engineer'
          ? this.props.get(
              config.API_URL + `/api/v1/engineers/${this.props.Auth.id}`,
            )
          : this.props.get(
              config.API_URL + `/api/v1/companies/${this.props.Auth.id}`,
            );
        this.setState({
          message: 'Login Success!',
          showAlert: true,
          color: '#29B6F6',
        });
        this.storedata(this.props.Auth.token);
      })
      .catch(() => {
        this.setState({
          showAlert: true,
          message: 'Login Failed!',
          color: '#E53935',
        });
      });
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  render() {
    const {showAlert, message, color} = this.state;
    return (
      <View style={styles.container}>
        {this.state.type === 'Login'
          ? [
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Email"
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                onChangeText={email => this.setState({email})}
                onSubmitEditing={() => this.password.focus()}
              />,
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Password"
                onChangeText={password => this.setState({password})}
                secureTextEntry={true}
                placeholderTextColor="#ffffff"
                ref={input => (this.password = input)}
              />,
              <TouchableOpacity style={styles.button} onPress={this.onLogin}>
                <Text style={styles.buttonText}>{this.props.type}</Text>
              </TouchableOpacity>,
            ]
          : [
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Name"
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                onChangeText={name => this.setState({name})}
                onSubmitEditing={() => this.password.focus()}
              />,
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Email"
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                onChangeText={email => this.setState({email})}
                keyboardType="email-address"
                onSubmitEditing={() => this.password.focus()}
              />,
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Password"
                onChangeText={password => this.setState({password})}
                secureTextEntry={true}
                placeholderTextColor="#ffffff"
                ref={input => (this.password = input)}
              />,
              <Item picker style={styles.inputBox}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Select Role"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  // eslint-disable-next-line react-native/no-inline-styles
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#ffffff"
                  selectedValue={this.state.role}
                  onValueChange={this.onValueChange}>
                  <Picker.Item label="Company" value="company" />
                  <Picker.Item label="Engineer" value="engineer" />
                </Picker>
              </Item>,
              <TouchableOpacity style={styles.button} onPress={this.onRegister}>
                <Text style={styles.buttonText}>{this.props.type}</Text>
              </TouchableOpacity>,
            ]}
        <AwesomeAlerts
          show={showAlert}
          showProgress={false}
          message={message}
          closeOnTouchOutSide={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={color}
          onConfirmPressed={() => {
            this.hideAlert();
            message === 'Register Success!'
              ? Actions.login()
              : message === 'Login Success!'
              ? this.props.navigation.navigate('Engineers')
              : this.forceUpdate();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  Auth: state.Auth,
});

const mapDispatchToProps = dispatch => ({
  post: (url, data) => dispatch(Register(url, data)),
  login: (url, data) => dispatch(Login(url, data)),
  get: url => dispatch(getSession(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },

  picker: {
    width: 300,
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    textShadowColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
