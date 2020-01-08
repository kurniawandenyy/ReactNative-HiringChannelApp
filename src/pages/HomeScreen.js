import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, StatusBar} from 'react-native';
import Routes from '../Routes';
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }

  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    var that = this;
    setTimeout(function() {
      that.Hide_Splash_Screen();
    }, 3000);
  }

  render() {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          {/* Put all your components Image and Text here inside Child view which you want to show in Splash Screen. */}
          <Image
            source={require('../img/hiring.png')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: '80%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    );
    return (
      <>
        {this.state.isVisible === true ? (
          <View style={styles.MainContainer}>
            <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
            {Splash_Screen}
          </View>
        ) : (
          <Routes navigation={this.props.navigation} />
        )}
      </>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '120%',
    height: '120%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F6D7A',
    flex: 1,
    margin: 20,
  },
});
