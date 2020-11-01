import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Header,
  Card,
  Title,
  CardItem,
  Text,
  Content,
  Grid,
  Row,
  Col,
  Left,
  Body,
  Right
} from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import HotelService from "./HotelServices";
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
const logo = require("../../../assets/logo.png");
const cardImage = require("../../../assets/skylightH.jpg");
import { withNavigation } from 'react-navigation';
import styles from "./styles";
import HttpService from "../../services/HttpService";
class HotelDetail extends Component {
  
  constructor(props){
    super(props);
    this.state ={ 
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/hotel/getAll/'
    }
  }

  async updateHotelView() {
    var data = {
     email: "",
     password: ""
    };
    this.abortController = new AbortController();
    try {
     let response = await fetch(
      this.state.baseUrl+'/',
      {
        method: "POST",
        signal: this.abortController.signal,
        headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
        },
       body: JSON.stringify(data)
     }
    );
    
   } catch (errors) {

    
    } 
}
componentDidMount()
  {
    this.updateHotelView();
  }
  render() {
    const supriya =  require("../../../assets/skylightH.jpg");
    const { navigation } = this.props;
    var hotel  = navigation.getParam('hotel', null);
    var location  = hotel.location.split(",");
    var hotelId = hotel.id;
    return (
              
       <Container>
          <Header style={{backgroundColor:"white",}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                          <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Hotel Detail</Title>
          </Body>
          <Right />
        </Header>
      
      <Content >
          <Card style={styles.mb}>
            <CardItem>
              <Left>              
                <Body>
    <Text style={{fontSize:18}}>{hotel.name}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem cardBody style={{flex:1,width:"100%",backgroundColor:"#646464"}}>
              <Image
                style={{
                  resizeMode: "cover",
                  width: '100%',
                  height: 200,
                  flex: 1
                }}
                source={{uri:this.state.baseUrl+hotel.photo}}
              />
            </CardItem>           
          </Card>
     
          <Grid>
            <Row style={styles.row}>
              
              <Col style={styles.col}  onPress={()=>this.props.navigation.navigate('HotelRoomList',{hotel:hotel})} >
                <Icon name="vpn-key" style={{ color: "#F05742" }} size={25}/>
                <Text numberOfLines={1} style={styles.iconText}>
                  Rooms
                </Text>
              </Col>
             
              <Col style={styles.col} onPress={()=>this.props.navigation.navigate('HotelMealMenu',{hotel:hotel})}>
                <Icon name="restaurant" style={{ color: "#F05742" }} size={25}/>
                <Text numberOfLines={1} style={styles.iconText}>
                  Dishes
                </Text>
              </Col>
              <Col style={styles.col} onPress={()=>this.props.navigation.navigate('HotelService',{hotel:hotel})}>
                <Icon name="star" style={{ color: "#F05742" }} size={25}/>
                <Text numberOfLines={1} style={styles.iconText}>
                  Amenities
                </Text>
              </Col>
                  
              <Col style={styles.col} onPress={()=>this.props.navigation.navigate('HotelLocation',{hotel:hotel})}>
                <Icon name="location-on" style={{ color: "#F05742" }} size={25}/>
                <Text numberOfLines={1} style={styles.iconText}>
                  Location
                </Text>
              </Col>
              <Col style={styles.col} onPress={()=>this.props.navigation.navigate('HotelGallery',{hotel:hotel})}>
                <Icon name="image" style={{ color: "#F05742" }} size={25}/>
                <Text numberOfLines={1} style={styles.iconText}>
                  Gallery
                </Text>
              </Col>                       
              <Col style={styles.col} onPress={()=>this.props.navigation.navigate('HotelContactInformation',{hotel:hotel})}>
                <Icon name="info" style={{ color: "#F05742" }} size={25}/>
                <Text numberOfLines={1} style={styles.iconText}>
                  Information
                </Text>
              </Col>  
            </Row>
            </Grid>
            </Content>
     {/* <Footer >
            <FooterTab style={{backgroundColor:"white"}}>
              <Button active={true}>
                <Icon active={true} name="apps" />
                <Text>Apps</Text>
              </Button>
              <Button onPress={()=>this.props.navigation.navigate('HotelRoomList',{hotel:hotel})}>
                <Icon name="key" />
                <Text>Rooms</Text>
              </Button>
              <Button onPress={()=>this.props.navigation.navigate('HotelMealMenu',{hotel:hotel})}>
                <Icon name="pizza" />
                <Text>Menu</Text>
              </Button>
              <Button  >
                <Icon  name="beer" />
                <Text>Service</Text>
              </Button>
            </FooterTab>
          </Footer> */}
      </Container>
      
       
    );
  }
}

export default withNavigation(HotelDetail);
