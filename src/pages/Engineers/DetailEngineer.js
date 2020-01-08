import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {
  Content,
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
} from 'native-base';
import conf from '../../../config';
import moment from 'moment';

const DetailEngineer = props => {
  const EngineerName = props.navigation.getParam('EngineerName');
  const EngineerPhoto = props.navigation.getParam('EngineerPhoto');
  const EngineerEmail = props.navigation.getParam('EngineerEmail');
  const EngineerSalary = props.navigation.getParam('EngineerSalary');
  const EngineerDob = props.navigation.getParam('EngineerDob');
  const EngineerDescription = props.navigation.getParam('EngineerDescription');
  const EngineerLocation = props.navigation.getParam('EngineerLocation');
  const EngineerSkill = props.navigation.getParam('EngineerSkill');
  const EngineerPhone = props.navigation.getParam('EngineerPhone');
  const name = EngineerName.split(' ');
  const firstName = name[0];

  moment.locale('en');
  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.navigate('Engineers')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{firstName} Profile</Title>
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
              uri: conf.API_URL + `/uploads/engineers/${EngineerPhoto}`,
            }}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{EngineerName}</Text>
              <Text style={styles.info}>{EngineerDescription}</Text>
              <View style={styles.rowDesc}>
                <View style={styles.logo}>
                  <Icon name="ios-mail" style={styles.icon} />
                  <Icon name="md-cash" style={styles.icon} />
                  <Icon name="ios-map" style={styles.icon} />
                  <Icon name="md-call" style={styles.icon} />
                  <Icon name="ios-calendar" style={styles.icon} />
                  <Text style={{marginTop: 12}}>Skills :</Text>
                </View>
                <View style={styles.logo}>
                  <Text style={styles.description}>{EngineerEmail}</Text>
                  <Text style={styles.description}>{EngineerSalary}</Text>
                  <Text style={styles.description}>{EngineerLocation}</Text>
                  <Text style={styles.description}>{EngineerPhone}</Text>
                  <Text style={styles.description}>
                    {moment(EngineerDob).format('d MMM YYYY')}
                  </Text>
                  <Text
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      marginTop: 14,
                      color: '#696969',
                    }}>
                    {EngineerSkill}
                  </Text>
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

export default DetailEngineer;

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
