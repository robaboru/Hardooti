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
  Icon,
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
import HotelService from "./HotelServices";
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import HttpService from "../../services/HttpService";
class HotelLocation extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      baseUrl:HttpService.baseUrl
    }
  }

  render() {
    const { navigation } = this.props;
    var hotel  = navigation.getParam('hotel', null);
    var location  = hotel.location.split(",");
    var hotelId = hotel.id;
    return (             
       <Container>
          <Header style={{backgroundColor:"white",}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color:"#F05742"}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Hotel Location</Title>
          </Body>
          <Right />
        </Header>
        <Container>
          
        <MapView
      // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude:parseFloat(location[0]),
         longitude: parseFloat(location[1]),
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
       minZoomLevel={17}
       
     >
        <MapView.Marker
            coordinate={{latitude:  parseFloat(location[0]),
            longitude:parseFloat(location[1])}}
            onPress={() => this.props.navigation.navigate('HotelContactInformation',{hotel:hotel})}
            >
              <Image source={require('./assets/hotel-indicator.png')} style={{height:70,width:70}} />
            </MapView.Marker>

     </MapView>    
     {/* <Content padder />
     <Card style={{width:'100%',marginLeft:'0%',backgroundColor:"#fff"}}   >             
            <CardItem >
              <Body style={styles.hotelListTextContainer}>
              <Icon name="map"  style={{fontSize:16,color:"green"}}/>  
              <Text style={styles.headerText}>
              Address
            </Text>
            <Text numberOfLines={1} note>
            {hotel.address}
            </Text>          
              </Body>                                    
            </CardItem>                            
          </Card> */}
     </Container> 
     <Card style={{width:'100%',marginLeft:'0%',backgroundColor:"#fff"}}   >             
            <CardItem >
              <Body style={styles.hotelListTextContainer}>
              <Icon name="map"  style={{fontSize:16,color:"green"}}/>  
              <Text style={styles.headerText}>
              Address
            </Text>
            <Text numberOfLines={1} note>
            {hotel.address}
            </Text>          
              </Body>                                    
            </CardItem>                            
          </Card>
      </Container>
      
       
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
   
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex:1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop:"3%",
    height: "100%",
    width: "94%",
    marginLeft:"3%"
    
  },
 });
export default withNavigation(HotelLocation);
