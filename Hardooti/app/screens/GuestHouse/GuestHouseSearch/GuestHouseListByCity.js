import React, { Component } from "react";
import { ActivityIndicator,TouchableHighlight,Alert,Linking,Keyboard  } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AndroidOpenSettings from 'react-native-android-open-settings';
import DeviceInfo from 'react-native-device-info';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Item,        
 Input,
  Right,
  Spinner 
} from "native-base";
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { withNavigation } from 'react-navigation';
import GuestHouseList from "../GuestHouseList";

class GuestHouseListByCity extends Component {
  
    constructor(props){
        super(props);     
      }
  render() {
    const { navigation } = this.props; 
    var city  = navigation.getParam('city', null);
    
   if(city != null)
   {
    return( <GuestHouseList city={city}/>); 
      
    }
    return(<Container></Container>);
}
}

export default withNavigation(GuestHouseListByCity);
