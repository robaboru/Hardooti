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

class HotelService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amenties:[]
    };
  }
  
  render() {
    const { navigation } = this.props;
    var hotel  = navigation.getParam('hotel', null);
    var services =[];
    if(hotel.services.length > 0)
    {
      services =hotel.services;
    
    return (
      <Container style={styles.container} > 
        <Header style={{backgroundColor:"white",}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="close" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Hotel Amenties</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Card >
        {
        services.map((service, key) => (
            <CardItem key={key}>
              <Left style={{flex:0.1}}>
                <Icon
                  active
                  name="check-circle"
                  style={{ color: "#F05742" }}
                  size={20}
                />
                </Left>
                <Body style={{flexDirection:"column",position:"relative",top:10}}>
                 <Text>{service.name}</Text>
                 <Text note>{service.description}</Text>
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
      'No amenties found for '+hotel.name,
      [
       
        {text: 'OK', onPress: () => this.props.navigation.goBack()},
      ],
      {cancelable: false},
    );
    return(<Container></Container>);
  }
  }
}

export default HotelService;
