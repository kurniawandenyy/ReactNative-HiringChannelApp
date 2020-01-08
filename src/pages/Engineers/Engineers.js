import React from 'react';
import {StyleSheet, AsyncStorage} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Thumbnail,
  Input,
  Item,
  Spinner,
  Picker,
} from 'native-base';
import {fetchEngineers} from '../../redux/actions/engineers';
import {connect} from 'react-redux';
import config from '../../../config';
import _ from 'lodash';
import Modal, {
  ModalContent,
  SlideAnimation,
  ModalTitle,
  ModalFooter,
  ModalButton,
} from 'react-native-modals';

class Engineers extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searchBar: false,
      loading: false,
      error: false,
      hasSearch: false,
      visible: false,
    };
    this.search = _.debounce(this.search, 1000);
  }

  componentDidMount() {
    // do something after component mounted
    this.props.fetch(config.API_URL + '/api/v1/engineers?page=1');
  }

  onSearch = key => {
    this.setState({hasSearch: true, loading: true, search: key});
    this.search(key);
  };

  refresh = () => {
    this.props.fetch(config.API_URL + '/api/v1/engineers?page=1');
    this.setState({searchBar: false});
  };

  search = async key => {
    try {
      await this.props.fetch(
        config.API_URL + `/api/v1/engineers?page=1&name=${key}`,
      );
    } catch (err) {
      this.setState({loading: false, error: true});
    }
  };

  showModal = () => {
    this.setState({visible: true});
  };

  render() {
    const {searchBar} = this.state;
    return (
      <Container style={styles.container}>
        {searchBar && (
          <Header rounded style={styles.header}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Item style={styles.search}>
                <Icon name="ios-search" />
                <Input
                  placeholder="Search"
                  onChangeText={text => {
                    this.onSearch(text);
                  }}
                />
                <Icon name="ios-people" />
              </Item>
            </Body>
            <Right>
              <Button transparent onPress={() => this.refresh()}>
                <Icon name="md-close" />
              </Button>
            </Right>
          </Header>
        )}
        {!searchBar && (
          <Header style={styles.header}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Engineers</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.setState({searchBar: true})}>
                <Icon name="search" />
              </Button>
              <Button transparent onPress={this.showModal}>
                <Icon name="ios-funnel" />
              </Button>
            </Right>
          </Header>
        )}

        <Content>
          {this.props.listEngineers.isLoading ? (
            <Spinner color="blue" />
          ) : this.state.error ? (
            <Text>Error, please try again</Text>
          ) : this.state.hasSearch &&
            this.props.listEngineers.card.length < 1 ? (
            <Text style={styles.text}>
              No series found with keyword "{this.state.search}", please try
              another keyword
            </Text>
          ) : (
            <List
              dataArray={this.props.listEngineers.card}
              renderRow={data => (
                <ListItem
                  avatar
                  onPress={() => {
                    this.props.navigation.navigate('DetailEngineer', {
                      EngineerID: data.id,
                      EngineerName: data.name,
                      EngineerPhoto: data.photo,
                      EngineerLocation: data.location,
                      EngineerDescription: data.description,
                      EngineerSalary: data.expected_salary,
                      EngineerEmail: data.email,
                      EngineerDob: data.date_of_birth,
                      EngineerPhone: data.phone,
                      EngineerSkill: data.skill,
                    });
                  }}>
                  {data.photo ? (
                    <Left>
                      <Thumbnail
                        square
                        style={styles.thumbnail}
                        source={{
                          uri:
                            config.API_URL + `/uploads/engineers/${data.photo}`,
                        }}
                      />
                    </Left>
                  ) : (
                    <Left>
                      <Thumbnail
                        square
                        style={styles.thumbnail}
                        source={require('../../img/logo.png')}
                      />
                    </Left>
                  )}
                  <Body>
                    <Text style={styles.text}>{data.name}</Text>
                    <Text style={styles.Description}>{data.description}</Text>
                    <Text note>{data.location}</Text>
                  </Body>
                </ListItem>
              )}
              // keyExtractor={data => this.props.listEngineers.card.id}
              // key={data => this.props.listEngineers.card.id}
            />
          )}
          <Modal
            visible={this.state.visible}
            onTouchOutside={() => {
              this.setState({visible: false});
            }}
            modalAnimation={
              new SlideAnimation({
                initialValue: 0, // optional
                useNativeDriver: true,
              })
            }
            modalTitle={<ModalTitle title="Filter" />}
            footer={
              <ModalFooter>
                <ModalButton
                  text="Cancel"
                  onPress={() => this.setState({visible: false})}
                />
                <ModalButton
                  text="OK"
                  onPress={() => this.setState({visible: false})}
                />
              </ModalFooter>
            }>
            <ModalContent style={{width: 250}}>
              <Text>Limit</Text>
              <Item picker style={styles.inputBox}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Limit"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  // eslint-disable-next-line react-native/no-inline-styles
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#ffffff"
                  selectedValue={this.state.role}
                  onValueChange={this.onValueChange}>
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="15" value="15" />
                  <Picker.Item label="20" value="20" />
                </Picker>
              </Item>
            </ModalContent>
          </Modal>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  listEngineers: state.listEngineers,
});

const mapDispatchToProps = dispatch => ({
  fetch: url => dispatch(fetchEngineers(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Engineers);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  search: {
    width: 250,
    height: 40,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: 'transparent',
    tintColor: '#FAFAFA',
    color: '#FAFAFA',
    marginVertical: 10,
  },
  filter: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'flex-start',
    marginBottom: 3,
    fontSize: 16,
    fontWeight: 'bold',
  },
  Description: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: 'normal',
  },
  header: {
    backgroundColor: '#4F6D7A',
  },
  thumbnail: {
    resizeMode: 'stretch',
    borderRadius: 5,
  },
});
