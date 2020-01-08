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
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import conf from '../../../config';
import DatePicker from 'react-native-datepicker';
import {Form, TextValidator} from 'react-native-validator-form';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {updateEngineer, getEngineer} from '../../redux/actions/engineers';

class EditEngineer extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      showAlert: false,
      changePhoto: false,
      photo: null,
      name: '',
      description: '',
      email: '',
      salary: '',
      location: '',
      phone: '',
      Dob: '',
      skill: '',
      showcase: '',
    };
  }

  componentDidMount() {
    this.initialState();
  }

  initialState = () => {
    this.setState({
      id: this.props.navigation.getParam('EngineerId'),
      photo: this.props.navigation.getParam('EngineerPhoto'),
      name: this.props.navigation.getParam('EngineerName'),
      description: this.props.navigation.getParam('EngineerDescription'),
      email: this.props.navigation.getParam('EngineerEmail'),
      salary: this.props.navigation.getParam('EngineerSalary').toString(),
      location: this.props.navigation.getParam('EngineerLocation'),
      phone: this.props.navigation.getParam('EngineerPhone'),
      Dob: moment(this.props.navigation.getParam('EngineerDob')).format(
        'YYYY-MM-DD',
      ),
      skill: this.props.navigation.getParam('EngineerSkill'),
      showcase: this.props.navigation.getParam('EngineerShowcase'),
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
    this.props.navigation.navigate('Profile');
    this.props.get(conf.API_URL + `/api/v1/engineers/${this.props.Auth.id}`);
  };

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Photo',
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
            ? this.setState({photo: response, changePhoto: true})
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
    this.props.navigation.navigate('Profile');
  };

  handleSave = () => {
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('date_of_birth', this.state.Dob);
    formData.append('location', this.state.location);
    formData.append('phone', this.state.phone);
    formData.append('description', this.state.description);
    formData.append('email', this.state.email);
    formData.append('expected_salary', this.state.salary);
    formData.append('skill', this.state.skill);
    formData.append('showcase', this.state.showcase);
    formData.append('photo', {
      name: this.state.photo.fileName,
      type: this.state.photo.type,
      uri: this.state.photo.uri,
    });

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.Auth.token}`,
        email: this.props.Auth.email,
      },
    };
    const url = conf.API_URL + '/api/v1/engineers/' + this.state.id;
    this.props.update(url, formData, config).then(_ => {
      this.setState({changePhoto: false, showAlert: true});
    });
  };

  render() {
    moment.locale('en');
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
            {this.state.changePhoto ? (
              <Avatar
                style={styles.avatar}
                rounded
                size="xlarge"
                onEditPress={this.handleChoosePhoto}
                activeOpacity={0.7}
                source={{
                  uri: this.state.photo.uri,
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
                  uri: conf.API_URL + `/uploads/engineers/${this.state.photo}`,
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
                    onSubmitEditing={() => this.skill.focus()}
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
                    onSubmitEditing={() => this.skill.focus()}
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
                    onSubmitEditing={() => this.skill.focus()}
                  />
                  <TextValidator
                    style={styles.inputBox}
                    validators={['required']}
                    errorMessages={['Expected salary required']}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Expected Salary"
                    defaultValue={this.state.salary}
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={salary => this.setState({salary})}
                    onSubmitEditing={() => this.skill.focus()}
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
                    onSubmitEditing={() => this.skill.focus()}
                  />
                  <TextValidator
                    style={styles.inputBox}
                    validators={['required']}
                    errorMessages={['Phone required']}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Phone"
                    defaultValue={this.state.phone}
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={phone => this.setState({phone})}
                    onSubmitEditing={() => this.skill.focus()}
                  />
                  <DatePicker
                    style={styles.inputBox}
                    date={this.state.Dob}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1950-01-01"
                    // maxDate="2020-02-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={date => {
                      this.setState({Dob: date});
                    }}
                  />
                  <TextValidator
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Showcase"
                    defaultValue={this.state.showcase}
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={showcase => this.setState({showcase})}
                    onSubmitEditing={() => this.skill.focus()}
                  />
                  <TextValidator
                    style={styles.inputBox}
                    validators={['required']}
                    errorMessages={['Skill required']}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Skill"
                    defaultValue={this.state.skill}
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={skill => this.setState({skill})}
                    onSubmitEditing={() => this.skill.focus()}
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
  listEngineers: state.listEngineers,
  Auth: state.Auth,
});

const mapDispatchToProps = dispatch => ({
  update: (url, formData, config) =>
    dispatch(updateEngineer(url, formData, config)),
  get: url => dispatch(getEngineer(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEngineer);

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
