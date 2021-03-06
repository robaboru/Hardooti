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
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from "react-native-gesture-handler";
import HttpService from "../../../services/HttpService";
class NearestRestaurantMap extends Component {
  constructor(props){
    super(props);
    this.state ={
      baseUrl:HttpService.baseUrl,
      isLocationLoaded:false,
      coordinate:null
    }
  }

//   renderMap()
//   {
//       if(this.state.isLocationLoaded)
//       {
//         let latitude ="";
//         let longitude ="";
//          if(this.state.coordinate != null)
//          {
//              const {lat,long} = this.state.coordinate;
//              latitude = lat;
//              longitude = long;

//          }
//          alert(longitude);
//           return
//           (

//           );
//       }
//   }
  render() {
    const { navigation } = this.props;
    var restaurants  = navigation.getParam('restaurants', null);
    let locations =[];
    restaurants.forEach(restaurant => {
        var location  =   restaurant.location.split(",");
        let coordinates={'latitude':location[0],'longitude':location[1]};
        locations.push(coordinates);
    });

    return (
        <Container>
           <Header style={{backgroundColor:"white",}} androidStatusBarColor="#F05742">
           <Left>
             <Button transparent onPress={() => this.props.navigation.goBack()}>
               <Icon name="arrow-back" style={{color:"#F05742"}}/>
             </Button>
           </Left>
           <Body>
             <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Restaurant Location</Title>
           </Body>
           <Right />
         </Header>

         <Container>
             <MapView
             // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude:parseFloat(locations[0].latitude),
                longitude: parseFloat(locations[0].longitude),
                latitudeDelta: 0.020,
                longitudeDelta: 0.0121,
              }}
              zoomEnabled={true}
              minZoomLevel={0}
              maxZoomLevel={19}
            mapPadding={{top: 200, right: 20, bottom: 0, left: 20}}

            >
               {
               locations.map((location, key) => (  <MapView.Marker
                   coordinate={{latitude:  parseFloat(location.latitude),
                   longitude:parseFloat(location.longitude)}}
                   onPress={() => this.props.navigation.navigate('RestaurantMealMenu',{restaurant:restaurants[key]})}
                   key={key}
                   >
                    <Image source={require('../assets/restaurant-indicator.png')} style={{height:50,width:50}} /> 
                   <Text style={{marginTop:-3,borderRadius:5,color:'white',backgroundColor:'#F05742',alignSelf:'center',paddingLeft: 10,paddingRight: 10,marginTop:-8}}>{key+1}</Text>
                   </MapView.Marker>
               ))
            }

            </MapView>
            </Container>



       </Container>


     );

    // var hotelId = hotel.id;

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
    marginLeft:"3%",
    padding: 100,
    flex:1

  },
 });
export default withNavigation(NearestRestaurantMap);
