import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
const {Platform, Dimensions} = require('react-native');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Button,
} from 'native-base';
import {connect} from 'react-redux';

const drawerCover = require('../img/drawer-cover.png');
const drawerImage = require('../img/person.png');
const dataEngineer = [
  {
    name: 'Profile',
    route: 'Profile',
    icon: 'ios-person',
    bg: '#C5F442',
  },
  {
    name: 'Engineers',
    route: 'Engineers',
    icon: 'ios-people',
    bg: '#C5F442',
  },
  {
    name: 'Companies',
    route: 'Companies',
    icon: 'ios-business',
    bg: '#C5F442',
  },
  {
    name: 'Logout',
    route: 'Logout',
    icon: 'ios-log-out',
    bg: '#C5F442',
  },
];

const datasCompany = [
  {
    name: 'Profile',
    route: 'CompanyProfile',
    icon: 'ios-person',
    bg: '#C5F442',
  },
  {
    name: 'Engineers',
    route: 'Engineers',
    icon: 'ios-people',
    bg: '#C5F442',
  },
  {
    name: 'Companies',
    route: 'Companies',
    icon: 'ios-business',
    bg: '#C5F442',
  },
  {
    name: 'Logout',
    route: 'Logout',
    icon: 'ios-log-out',
    bg: '#C5F442',
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  render() {
    const datas =
      this.props.Auth.role === 'engineer' ? dataEngineer : datasCompany;
    return (
      <Container>
        <Content
          bounces={false}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1, backgroundColor: '#fff', top: -1}}>
          <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />
          <Text style={styles.drawerText}> {this.props.Auth.SessionName}</Text>
          <List
            dataArray={datas}
            renderRow={data => (
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}>
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{color: '#777', fontSize: 26, width: 30}}
                  />
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
                {data.types && (
                  // eslint-disable-next-line react-native/no-inline-styles
                  <Right style={{flex: 1}}>
                    <Badge
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg,
                      }}>
                      <Text style={styles.badgeText}>{`${
                        data.types
                      } Types`}</Text>
                    </Badge>
                  </Right>
                )}
              </ListItem>
            )}
          />
          {/* <Button style={{alignse: 'flex-end'}}>
            <Icon name="ios-log-out" />
            <Text>Tes Logout</Text>
          </Button> */}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps)(SideBar);

const styles = StyleSheet.create({
  drawerCover: {
    alignSelf: 'stretch',
    height: deviceHeight / 3.5,
    width: null,
    position: 'relative',
    marginBottom: 10,
  },
  drawerImage: {
    position: 'absolute',
    left: Platform.OS === 'android' ? deviceWidth / 18 : deviceWidth / 9,
    top: Platform.OS === 'android' ? deviceHeight / 5.5 : deviceHeight / 12,
    width: 60,
    height: 70,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },
  drawerText: {
    position: 'absolute',
    left: Platform.OS === 'android' ? deviceWidth / 4.8 : deviceWidth / 9,
    top: Platform.OS === 'android' ? deviceHeight / 4.4 : deviceHeight / 12,
    alignSelf: 'flex-start',
    color: '#FAFAFA',
    fontWeight: 'bold',
  },
  text: {
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontSize: 16,
    marginLeft: 20,
  },
  badgeText: {
    fontSize: Platform.OS === 'ios' ? 13 : 11,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? -3 : undefined,
  },
});
