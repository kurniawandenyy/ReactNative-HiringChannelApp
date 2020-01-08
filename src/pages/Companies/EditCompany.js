import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ToastAndroid} from 'react-native';
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
import {Avatar} from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import conf from '../../../config';
import {Form, TextValidator} from 'react-native-validator-form';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {updateCompany, getCompany} from '../../redux/actions/companies';

class EditCompany extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      showAlert: false,
      changeLogo: false,
      logo: null,
      name: '',
      description: '',
      email: '',
      location: '',
    };
  }

  componentDidMount() {
    this.initialState();
  }

  initialState = () => {
    this.setState({
      id: this.props.navigation.getParam('CompanyId'),
      logo: this.props.navigation.getParam('CompanyLogo'),
      name: this.props.navigation.getParam('CompanyName'),
      description: this.props.navigation.getParam('CompanyDescription'),
      email: this.props.navigation.getParam('CompanyEmail'),
      location: this.props.navigation.getParam('CompanyLocation'),
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

  handleUpdate = () => {
    this.initialState();
    this.props.navigation.navigate('CompanyProfile');
    this.props.get(conf.API_URL + `/api/v1/companies/${this.props.Auth.id}`);
  };

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Logo',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images',
      // },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        response.type === 'image/jpg' ||
        response.type === 'image/jpeg' ||
        response.type === 'image/png'
          ? response.fileSize <= 6000000
            ? this.setState({logo: response, changeLogo: true})
            : ToastAndroid.showWithGravityAndOffset(
                'Maximum File size is 6 MB',
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                20,
              )
          : ToastAndroid.showWithGravityAndOffset(
              'Profile Picture must be JPG or PNG',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              20,
            );
        // this.props.navigation.navigate('tab');
      }
    });
  };

  onBack = () => {
    this.initialState();
    this.props.navigation.navigate('CompanyProfile');
  };

  handleSave = () => {
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('location', this.state.location);
    formData.append('description', this.state.description);
    formData.append('email', this.state.email);
    formData.append('logo', {
      name: this.state.logo.fileName,
      type: this.state.logo.type,
      uri: this.state.logo.uri,
    });

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.Auth.token}`,
        email: this.props.Auth.email,
      },
    };
    const url = conf.API_URL + '/api/v1/companies/' + this.state.id;
    this.props.update(url, formData, config).then(_ => {
      this.setState({changeLogo: false, showAlert: true});
    });
  };

  render() {
    const {showAlert} = this.state;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={this.onBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Edit Profile</Title>
          </Body>
          <Right>
            <Button
              onPress={this.handleSave}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                backgroundColor: '#90A4AE',
                width: 65,
                height: 40,
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fafafa'}}>Save</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <View style={styles.container}>
            <View style={styles.headerContent} />
            <Image
              style={styles.headerImg}
              source={require('../../img/whitetitle.png')}
            />
            {this.state.changeLogo ? (
              <Avatar
                style={styles.avatar}
                rounded
                size="xlarge"
                onEditPress={this.handleChoosePhoto}
                activeOpacity={0.7}
                source={{
                  uri: this.state.logo.uri,
                }}
                showEditButton
              />
            ) : (
              <Avatar
                style={styles.avatar}
                rounded
                size="xlarge"
                onEditPress={this.handleChoosePhoto}
                activeOpacity={0.7}
                source={{
                  uri: conf.API_URL + `/uploads/companies/${this.state.logo}`,
                }}
                showEditButton
              />
            )}
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Form ref="ref">
                  <TextValidator
                    style={styles.inputBox}
                    validators={['required']}
                    errorMessages={['Name required']}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Name"
                    defaultValue={this.state.name}
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={name => this.setState({name})}
                    onSubmitEditing={() => this.location.focus()}
                  />
                  <TextValidator
                    style={styles.inputBox}
                    validators={['required']}
                    errorMessages={['Description required']}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Description"
                    defaultValue={this.state.description}
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={description => this.setState({description})}
                    onSubmitEditing={() => this.location.focus()}
                  />
                  <TextValidator
                    style={styles.inputBox}
                    validators={['required']}
                    errorMessages={['Email required']}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Email"
                    defaultValue={this.state.email}
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={email => this.setState({email})}
                    onSubmitEditing={() => this.location.focus()}
                  />
                  <TextValidator
                    style={styles.inputBox}
                    validators={['required']}
                    errorMessages={['Location required']}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Location"
                    defaultValue={this.state.location}
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={location => this.setState({location})}
                    onSubmitEditing={() => this.location.focus()}
                  />
                </Form>
              </View>
            </View>
          </View>
        </Content>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Update Data"
          message="Successfully updated!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          // cancelText="No, cancel"
          confirmText="OK"
          confirmButtonColor="#0277BD"
          onConfirmPressed={() => {
            this.handleUpdate();
            this.hideAlert();
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  listCompanies: state.listCompanies,
  Auth: state.Auth,
});

const mapDispatchToProps = dispatch => ({
  update: (url, formData, config) =>
    dispatch(updateCompany(url, formData, config)),
  get: url => dispatch(getCompany(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditCompany);

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
    // marginTop: -75,
    borderStyle: 'solid',
    // borderWidth: 5,
    // borderColor: 'white',
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
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(0, 75, 75, 0.5)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#212121',
    marginVertical: 10,
  },
});
