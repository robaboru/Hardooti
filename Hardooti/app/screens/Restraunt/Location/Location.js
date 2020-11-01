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
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import HttpService from "../../../services/HttpService";

class RestaurantLocation extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      baseUrl:HttpService.baseUrl
    }
  }

  render() {
    const { navigation } = this.props;
    var restaurant  = navigation.getParam('restaurant', null);
    var location  = restaurant.location.split(",");
    var restaurantId = restaurant.id;
    return (             
       <Container>
          <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Location</Title>
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
            
           
         />        
     </MapView>    
     {/* <Content padder />
     <Card style={{width:'100%',marginLeft:'0%',backgroundColor:"#fff"}}   >             
            <CardItem >
              <Body style={styles.ListTextContainer}>
              <Icon name="map"  style={{fontSize:16,color:"green"}}/>  
              <Text style={styles.headerText}>
              Address
            </Text>
            <Text numberOfLines={1} note>
            {restaurant.address}
            </Text>          
              </Body>                                    
            </CardItem>          
                   
          </Card> */}
     </Container> 
     <Card style={{width:'100%',marginLeft:'0%',backgroundColor:"#fff"}}   >             
            <CardItem >
              <Body style={styles.ListTextContainer}>
              <Icon name="map"  style={{fontSize:16,color:"green"}}/>  
              <Text style={styles.headerText}>
              Address
            </Text>
            <Text numberOfLines={1} note>
            {restaurant.address}
            </Text>          
              </Body>                                    
            </CardItem>          
                   
          </Card>
          <Footer >
  <FooterTab style={{backgroundColor:"white"}}>
   
    <Button active={true} style={{backgroundColor:"white",color:"#000"}} onPress={() => this.props.navigation.navigate('RestaurantInformation',{restaurant:restaurant})}>
      <Icon active={true} name="info" size={20} style={{color:"gray"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Information</Text>
    </Button>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}}>
      <Icon active={true} name="location-on" size={20} style={{color:"#F05742"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Location</Text>
    </Button>
  </FooterTab>
</Footer>
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
    marginTop:"0%",
    height: "100%",
    width: "94%",
    marginLeft:"3%"
    
  },
 });
export default withNavigation(RestaurantLocation);
