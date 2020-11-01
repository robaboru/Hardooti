import React, { Component } from 'react'
import {View,Image,Dimensions,StyleSheet} from 'react-native';
import { 
     Container,
    Header,
    Title,
    Content,
    Button,
    ListItem,
    Text,
    Badge,
    Left,
    Right,
    Body,
    Switch,
    Radio,
    Picker,
    Separator } from "native-base";
 import Icon from 'react-native-vector-icons/MaterialIcons';
 import { withNavigation } from 'react-navigation';
const routes = ["Home", "Chat", "Profile"];
const drawerImage = require("./asset/drawer.png");
 class MenuDrawer extends React.Component
{


  navigateToScreen = (screenName) =>
  {
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate(screenName);
  }
    render()
    {
        return (
          <Container>
            <Content>
              <View
                style={{
                  backgroundColor: '#F05742',
                  paddi: 0,
                  borderBottomWidth: 2,
                  borderColor: '#ddd',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 25,
                    padding: '10%',
                  }}>
                  Go Hospitality
                </Text>
                {/* <Image square  source={drawerImage} style={{alignSelf:'center',marginTop:10}} /> */}
              </View>

              <ListItem
                icon
                onPress={() => this.navigateToScreen('Hotel')}
                noBorder>
                <Left>
                  <Icon
                    active
                    name="hotel"
                    size={25}
                    style={style.listItem}
                  />
                </Left>
                <Body>
                  <Text style={style.listItemText}>Hotel</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                noBorder
                onPress={() =>
                  this.navigateToScreen('RestaurantList')
                }>
                <Left>
                  <Icon
                    active
                    name="restaurant"
                    size={25}
                    style={style.listItem}
                  />
                </Left>
                <Body>
                  <Text style={style.listItemText}>Restaurant</Text>
                </Body>
              </ListItem>
              {/* <ListItem icon noBorder onPress={()=>this.props.navigation.navigate('GuestHouseList')}>
            <Left>         
                <Icon active name="vpn-key" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Guest House</Text>
            </Body>          
          </ListItem> */}
              {/* <ListItem icon noBorder onPress={()=>this.props.navigation.navigate('ClubList')}>
            <Left>         
                <Icon active name="local-bar" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Club</Text>
            </Body>          
          </ListItem> */}
              <ListItem
                icon
                noBorder
                onPress={() =>
                  this.navigateToScreen('EventList')
                }>
                <Left>
                  <Icon
                    active
                    name="local-movies"
                    size={25}
                    style={style.listItem}
                  />
                </Left>
                <Body>
                  <Text style={style.listItemText}>Event</Text>
                </Body>
              </ListItem>
              {/* <ListItem icon noBorder onPress={()=>this.props.navigation.navigate('CafeList')}>
            <Left>         
                <Icon active name="local-cafe" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Cafe</Text>
            </Body>          
          </ListItem> */}
              <ListItem
                icon
                noBorder
                onPress={() =>
                  this.navigateToScreen('TourAgencyList')
                }>
                <Left>
                  <Icon
                    active
                    name="local-see"
                    size={25}
                    style={style.listItem}
                  />
                </Left>
                <Body>
                  <Text style={style.listItemText}>Tour & Travel</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                noBorder
                onPress={() =>
                  this.navigateToScreen('TourGuiderList')
                }>
                <Left>
                  <Icon
                    active
                    name="people"
                    size={25}
                    style={style.listItem}
                  />
                </Left>
                <Body>
                  <Text style={style.listItemText}> Tour Guides</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                noBorder
                onPress={() =>
                  this.navigateToScreen('ContactUs')
                }>
                <Left>
                  <Icon
                    active
                    name="contact-phone"
                    size={25}
                    style={style.listItem}
                  />
                </Left>
                <Body>
                  <Text style={style.listItemText}>Contact Us</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                noBorder
                onPress={() => this.navigateToScreen('Help')}>
                <Left>
                  <Icon
                    active
                    name="help"
                    size={25}
                    style={style.listItem}
                  />
                </Left>
                <Body>
                  <Text style={style.listItemText}>Help</Text>
                </Body>
              </ListItem>
              {/*
          <ListItem icon noBorder>
            <Left>         
                <Icon active name="phone" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Contact us</Text>
            </Body>          
          </ListItem> */}
            </Content>
          </Container>
        );
    }

}
export default withNavigation(MenuDrawer);
const style = StyleSheet.create({

    listItem:{
        color:'#666',
        paddingLeft:10
    },
    listItemText:
    {
        color:"#000",
        fontSize:16,
        paddingLeft:15
    }
})