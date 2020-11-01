import React,{Component} from 'react';
import { ActivityIndicator,TouchableHighlight,Alert,Linking,Keyboard  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
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
import { withNavigation } from 'react-navigation';
import { MenuProvider } from 'react-native-popup-menu';
import PopupMenu from './PopupMenu';
class Exception extends React.Component
{
render()
{
    // const { navigation } = this.props;
    // var message  = navigation.getParam('message', null);
    return(
        <Container style={{backgroundColor:'#f3f8ff'}}>
           <Header style={{backgroundColor:"#fff"}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
                           <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
    <Title style={{color:"#000",fontSize:16,alignSelf:'flex-end',fontFamily: 'Cochin'}}></Title>
          </Body>
          <Right />
        </Header>       
        <Text style={{color:'#F05742',fontSize:45,fontWeight:'bold',alignSelf:'center',paddingTop:30}}>Oops!</Text>
      <Text style={{alignSelf:'center',paddingTop:20}}>Unable to load please try again.</Text>
     <Body>
      <Button style={{marginTop:50,backgroundColor:'#fff',borderColor:'#F05742',borderWidth:1}}
      onPress={() => this.props.navigation.goBack()}>
        <Text style={{alignSelf:'center',fontSize:16,fontWeight:'600',flexDirection:'row',color:'#000',textTransform:'capitalize'}}>Try again</Text></Button>
     </Body>
        </Container>
      );
}

}
export default withNavigation(Exception);
