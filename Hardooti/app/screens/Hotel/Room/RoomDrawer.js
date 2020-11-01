import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';  
import {  
    createDrawerNavigator
} from 'react-navigation-drawer';  
import HotelRoomDetial from './HotelRoomDetail';
import { withNavigation } from 'react-navigation';
class RoomDrawer extends React
{
    render() {  
        return <AppContainer />;  
    }  
}
export default withNavigation(RoomDrawer);
const AppDrawerNavigator = createDrawerNavigator({  
    Dashboard: {  
        screen: HotelRoomDetial  
    },  
    Welcome: {  
        screen: HotelRoomDetial  
    },  
});  
const AppContainer = createAppContainer(AppDrawerNavigator);  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        alignItems: 'center',  
        justifyContent: 'center'  
    }  
});  