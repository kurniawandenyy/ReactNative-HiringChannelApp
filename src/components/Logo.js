import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 180, height: 150}}
          source={require('../img/hiring.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
