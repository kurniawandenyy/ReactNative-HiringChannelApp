import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
} from 'native-base';
import conf from '../../../config';

const DetailCompany = props => {
  const CompanyName = props.navigation.getParam('CompanyName');
  const CompanyLogo = props.navigation.getParam('CompanyLogo');
  const CompanyEmail = props.navigation.getParam('CompanyEmail');
  const CompanyDescription = props.navigation.getParam('CompanyDescription');
  const CompanyLocation = props.navigation.getParam('CompanyLocation');

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.navigate('Companies')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{CompanyName} Profile</Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <View style={styles.container}>
          <View style={styles.headerContent} />
          <Image
            style={styles.headerImg}
            source={require('../../img/whitetitle.png')}
          />
          <Image
            style={styles.avatar}
            source={{
              uri: conf.API_URL + `/uploads/companies/${CompanyLogo}`,
            }}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{CompanyName}</Text>
              <Text style={styles.info}>{CompanyDescription}</Text>
              <View style={styles.rowDesc}>
                <View style={styles.logo}>
                  <Icon name="ios-mail" style={styles.icon} />
                  <Icon name="ios-map" style={styles.icon} />
                </View>
                <View style={styles.logo}>
                  <Text style={styles.description}> {CompanyEmail}</Text>
                  <Text style={styles.description}> {CompanyLocation}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.buttonEdit}>
                  <Text style={{color: '#FAFAFA'}}>
                    <Icon name="ios-chatboxes" style={{color: '#fafafa'}} />
                    &nbsp;Message
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default DetailCompany;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#4F6D7A',
  },
  headerContent: {
    backgroundColor: '#B0BEC5',
    height: 200,
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 83,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
    backgroundColor: '#fafafa',
  },
  headerImg: {
    width: '100%',
    height: 130,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    resizeMode: 'stretch',
    marginTop: 30,
  },
  body: {
    marginTop: 70,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  logo: {
    flexDirection: 'column',
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 14,
  },
  icon: {marginTop: 8},
  row: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 8,
  },
  rowDesc: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonEdit: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
    borderRadius: 30,
    marginRight: 20,
    backgroundColor: '#00BCD4',
  },
});
