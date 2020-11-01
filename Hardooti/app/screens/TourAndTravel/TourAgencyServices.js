import React, { Component } from "react";
import { Platform,Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Header,
  Title,
  Content,
  Col,
  Row,
  Card,
  CardItem,
  Left,
  Right,
  Button,
  Body,
  Grid,
  Text,
  Picker,
  Separator
} from "native-base";
import styles from "./styles";

const Item = Picker.Item;

class TourAgencyService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services:[]
    };
  }
  
  render() {
    const { navigation } = this.props;
    var tourAgency  = navigation.getParam('tourAgency', null);
    var services =[];
    if(tourAgency.services.length > 0)
    {
      services =tourAgency.services;
    
    return (
      <Container style={styles.container} > 
        <Header style={{backgroundColor:"white",}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="close" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Services</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Card >
        {
        services.map((service, key) => (
            <CardItem key={key}>
           
                <Body style={{flexDirection:"column",position:"relative",top:10}}>
                    
                 <Text style={{fontWeight:'bold'}}>{service.service_name}</Text>
                 <Text note>{service.service_description}</Text>
                </Body>                           
            </CardItem>
             ))
         }
            
          </Card>   
       </Content>
       </Container>
    );
  }
  else
  {
    
    Alert.alert(
      '',
      'No additional service found for '+tourAgency.company_name,
      [
       
        {text: 'OK', onPress: () => this.props.navigation.goBack()},
      ],
      {cancelable: false},
    );
    return(<Container></Container>);
  }
  }
}

export default TourAgencyService;
