import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {Container, Header, Left} from 'native-base';
import Home from '../Home/Home';
const DrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: Home }
  },
  {
    initialRouteName:'Home',
    drawerWidth:300,
    drawerPosition:'Left'
  }
);
const AppContainer = createAppContainer(DrawerNavigator);
export default class HomeScreenRouter extends Component
{
render()
{
  return <AppContainer />
}
 
};