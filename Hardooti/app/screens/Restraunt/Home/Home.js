import React, { Component } from 'react'
import {View,Text,Image,Dimensions} from 'react-native';
import {createDrawerNavigator } from 'react-navigation-drawer';
import { withNavigation,createAppContainer } from 'react-navigation';
import CategoryList from '../Category/CategoryList';
import MenuDrawer from './MenuDrawer';
const Width = Dimensions.get("window").width;
const drawerConfig ={
  drawerWidth:Width*0.75,
  contentComponent:({navigation})=>
  {
    return(<MenuDrawer />)
  }
}
const DrawerNavigatorr = createDrawerNavigator({
  Home :{screen:CategoryList}
},
drawerConfig);

export default createAppContainer(DrawerNavigatorr);