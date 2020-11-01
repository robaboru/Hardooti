import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Body
} from "native-base";
import { Linking,TouchableHighlight,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
class Help extends Component {
    
   

  render() {

    return (
      <Container style={{backgroundColor:'#f3f8ff'}}>
       <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Help</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card style={{marginBottom: 15,width:"100%",}} >

            <CardItem style={{marginTop:-5}}>        
               <Text>©Help{"\n"}Dear user, we are grateful with your interest in using goHospitality mobile App.
               {"\n"}The aim of goHospitality Mobile application is to furnish travelers/tourists or local communities with full and updated information about hospitality services around their city or when they are away from their home.
               {"\n"}
               Get started. Make sure your Android operating system version is greater than or equal to 4.1 and go to Google play store or download the app from goHospitality.net.
               {"\n"}After downloading the app, click on the app. And you will see different services like hotels, guesthouse, café, restaurant, tour and travel, events and club (night club) etc.
              Now, it is your preference to select what you want from the given services and follow it carefully. After clicking on each button, you will see plenty of information you want under each category. If you are interested to reserve (book) your services click on reserve button on the top right or on bottom right. After you click on this icon you will be directed to your phone dashboard, call and talk reception.
              {"\n"}
              Exchange rate: This section enables you to know the daily currency exchange of the stated banks.
              {"\n"}
              Connectivity: When using goHospitality mobile application, make sure you are connected with WiFi or mobile data. 
              {"\n"}
              You can follow us on facebook, Youtube,Telegram,Instagram and Tiwitter.
              {"\n"}
              <Text style={{fontWeight:'bold'}}>NOTICE:</Text> We have signed an agreement with hospitality service providers. They have signed an agreement accompanied by rules and regulations to provide the promised services to their respective customers without any delay which displayed in gohospitality App. We are not direct seller of the hospitality services; we are promoting/advertising company. 
              {"\n"}
              If you are experiencing poor service or dissatisfaction you are encouraged to talk with the supervisor and forward your complaints. If not solved, contact us through our e-mail address.</Text>
             
            </CardItem>
          </Card>
          
        </Content>
      </Container>
    );
  }
}

export default withNavigation(Help);

