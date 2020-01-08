import React from 'react';
import {Text} from 'react-native';
import {Container, Header, Item, Icon, Input, Button} from 'native-base';

const Search = () => {
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon name="ios-people" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
    </Container>
  );
};

export default Search;
