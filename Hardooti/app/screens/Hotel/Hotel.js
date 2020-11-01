import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HoteList from './HotelList';
import HotelService from './HotelServices';
export default class Hotel extends Component {
  render() {
    return (
     <HoteList />
    )
  }
}
