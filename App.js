import React from 'react';
// import {StackNavigator, DrawerNavigator} from 'react-navigation';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/pages/HomeScreen';
import Engineers from './src/pages/Engineers/Engineers';
import Companies from './src/pages/Companies/Companies';
import SideBar from './src/pages/Sidebar';
import Login from './src/pages/Login';
import EngineerProfile from './src/pages/Engineers/EngineerProfile';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Register from './src/pages/Register';
import Logout from './src/pages/Logout';
import DetailEngineer from './src/pages/Engineers/DetailEngineer';
import EditEngineer from './src/pages/Engineers/EditEngineer';
import DetailCompany from './src/pages/Companies/DetailCompany';
import CompanyProfile from './src/pages/Companies/CompanyProfile';
import EditCompany from './src/pages/Companies/EditCompany';

console.disableYellowBox = true;
const Drawer = createDrawerNavigator(
  {
    Home: {screen: HomeScreen},
    Engineers: {screen: Engineers},
    Companies: {screen: Companies},
    Login: {screen: Login},
    Register: {screen: Register},
    Profile: {screen: EngineerProfile},
    Logout: {screen: Logout},
    DetailEngineer: {screen: DetailEngineer},
    EditEngineer: {screen: EditEngineer},
    EditCompany: {screen: EditCompany},
    DetailCompany: {screen: DetailCompany},
    CompanyProfile: {screen: CompanyProfile},
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    contentComponent: props => <SideBar {...props} />,
  },
);

const AppNavigator = createStackNavigator(
  {
    Drawer: {screen: Drawer},
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
