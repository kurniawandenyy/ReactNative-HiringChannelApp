import React, {Component} from 'react';
import {StackActions, NavigationActions} from 'react-navigation';
import AwesomeAlert from 'react-native-awesome-alerts';
import {AsyncStorage} from 'react-native';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'Drawer'})],
});

export default class Logout extends Component {
  constructor() {
    super();
    this.state = {
      showAlert: true,
    };
  }

  handleLogout = () => {
    AsyncStorage.removeItem('token');
    this.props.navigation.dispatch(resetAction);
    this.hideAlert();
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
    const {showAlert} = this.state;
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Logout"
        message="Are you sure you want to logout?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Logout"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          this.props.navigation.navigate('Engineers');
          this.hideAlert();
        }}
        onConfirmPressed={this.handleLogout}
      />
    );
  }
}
