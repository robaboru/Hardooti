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
 class MenuDrawer extends React.Component
{

    render()
    {
        return(
            <Container>
            <Content>
                <View style={{backgroundColor:"#fff",padding:20,borderBottomWidth:1,borderColor:"#ccc"}}>
             
             <Text style={{color:"#F05742",alignSelf:"center",fontWeight:"bold",
             fontSize:25,padding:"5%"}}>PlanGo</Text>
               
               </View>
            
          <ListItem icon onPress={()=>this.props.navigation.navigate('Hotel')} noBorder>
            <Left >         
                <Icon active name="hotel" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Hotel</Text>
            </Body>          
          </ListItem>
          <ListItem icon noBorder>
            <Left>         
                <Icon active name="local-dining" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Restraunt</Text>
            </Body>          
          </ListItem>
          <ListItem icon noBorder>
            <Left>         
                <Icon active name="vpn-key" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Pension</Text>
            </Body>          
          </ListItem>
          <ListItem icon noBorder>
            <Left>         
                <Icon active name="local-movies" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Events</Text>
            </Body>          
          </ListItem>
          <ListItem icon noBorder>
            <Left>         
                <Icon active name="local-see" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Tour and Travel</Text>
            </Body>          
          </ListItem>
          <ListItem icon noBorder>
            <Left>         
                <Icon active name="local-atm" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Exchange</Text>
            </Body>          
          </ListItem>
          <ListItem icon noBorder>
            <Left>         
                <Icon active name="send" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Subscribe</Text>
            </Body>          
          </ListItem>
          <ListItem icon noBorder>
            <Left>         
                <Icon active name="info" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>About</Text>
            </Body>          
          </ListItem>
          <ListItem icon noBorder>
            <Left>         
                <Icon active name="phone" size={25} style={style.listItem}/>          
            </Left>
            <Body>
              <Text style={style.listItemText}>Contact us</Text>
            </Body>          
          </ListItem>
            </Content>
            
          </Container>
        );
    }

}
export default withNavigation(MenuDrawer);
const style = StyleSheet.create({

    listItem:{
        color:'#aaa'
    },
    listItemText:
    {
        color:"#000",
        fontSize:15
    }
})