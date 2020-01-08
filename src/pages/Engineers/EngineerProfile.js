import React, {Component} from 'react';
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
import {getEngineer, deleteEngineer} from '../../redux/actions/engineers';
import {connect} from 'react-redux';
import conf from '../../../config';
import AwesomeAlert from 'react-native-awesome-alerts';
import {NavigationActions, StackActions} from 'react-navigation';
import moment from 'moment';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'Drawer'})],
});

class EngineerProfile extends Component {
  constructor() {
    super();
    this.state = {
      showAlert: false,
    };
  }
  componentDidMount() {
    this.props.get(conf.API_URL + `/api/v1/engineers/${this.props.Auth.id}`);
  }

  handleDelete = () => {
    this.setState({
      showAlert: true,
    });
    const url = conf.API_URL + `/api/v1/engineers/${this.props.Auth.id}`;
    const config = {
      headers: {
        Authorization: 'Bearer ' + this.props.Auth.token,
        email: this.props.Auth.email,
      },
    };
    this.props.delete(url, config).then(() => {
      this.props.navigation.dispatch(resetAction);
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
    const {showAlert} = this.state;
    moment.locale('en');
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
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
                uri:
                  conf.API_URL +
                  `/uploads/engineers/${this.props.listEngineers.photo}`,
              }}
            />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{this.props.listEngineers.name}</Text>
                <Text style={styles.info}>
                  {this.props.listEngineers.description}
                </Text>
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
                    <Text style={styles.description}>
                      {this.props.listEngineers.email}
                    </Text>
                    <Text style={styles.description}>
                      {this.props.listEngineers.expected_salary}
                    </Text>
                    <Text style={styles.description}>
                      {this.props.listEngineers.location}
                    </Text>
                    <Text style={styles.description}>
                      {this.props.listEngineers.phone}
                    </Text>
                    <Text style={styles.description}>
                      {moment(this.props.listEngineers.date_of_birth).format(
                        'd MMM YYYY',
                      )}
                    </Text>
                    <Text
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        marginTop: 14,
                        color: '#696969',
                      }}>
                      {this.props.listEngineers.skill}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('EditEngineer', {
                        EngineerId: this.props.listEngineers.id,
                        EngineerPhoto: this.props.listEngineers.photo,
                        EngineerName: this.props.listEngineers.name,
                        EngineerDescription: this.props.listEngineers
                          .description,
                        EngineerEmail: this.props.listEngineers.email,
                        EngineerSalary: this.props.listEngineers
                          .expected_salary,
                        EngineerLocation: this.props.listEngineers.location,
                        EngineerPhone: this.props.listEngineers.phone,
                        EngineerDob: this.props.listEngineers.date_of_birth,
                        EngineerSkill: this.props.listEngineers.skill,
                        EngineerShowcase: this.props.listEngineers.showcase,
                      })
                    }
                    style={styles.buttonEdit}>
                    <Text style={{color: '#FAFAFA'}}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={this.showAlert}>
                    <Text style={{color: '#FAFAFA'}}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Content>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Delete Account"
          message="Are you sure you want to delete your account?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.handleDelete();
            this.hideAlert();
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  listEngineers: state.listEngineers,
  Auth: state.Auth,
});

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getEngineer(url)),
  delete: (url, config) => dispatch(deleteEngineer(url, config)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EngineerProfile);

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
    marginTop: 50,
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
    width: 130,
    borderRadius: 30,
    marginRight: 20,
    backgroundColor: '#FFB300',
  },
  buttonDelete: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    borderRadius: 30,
    backgroundColor: '#F44336',
  },
});
