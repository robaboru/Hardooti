import React, { Component } from "react";
import { ActivityIndicator,TouchableHighlight,Alert,Linking,Keyboard,PermissionsAndroid,AsyncStorage,View   } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Footer,
  FooterTab,
  Left,
  Right,
  Col,
  Grid,
  Row,
  Spinner,
  Body,
  Fab
} from "native-base";
import Geolocation from 'react-native-geolocation-service';
import AndroidOpenSettings from 'react-native-android-open-settings';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import ProgressLoader from "../common/ProgressLoader";
import MapView from 'react-native-maps';
import Exception from "../common/Exception";
class NearestCategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      isLoadingLocation:false,
      isException:false,
      location:null,
      coordinates:null
    };
  }
  
  componentDidMount()
  {
    AsyncStorage.getItem('coordinates').then((value) => 
    {
      if(JSON.parse(value) !=null)
      {
        
      this.setState({ coordinates: JSON.parse(value) });
      }
      else{
        DeviceInfo.isLocationEnabled().then(enabled => 
          {
         if(enabled)
         {
          if(this.state.location == null)
          {
          this.requestLocationPermission();
          }
         }
         else
         {
          Alert.alert(
              'Location Setting',
              'Please enable your location setting.',
              [
                {
                  text: 'Cancel',
                  onPress: () => this.props.navigation.goBack(),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => this.openLocationSetting()},
              ],
              {cancelable: false},
            );
            this.props.navigation.goBack();
         }
        });
      }
    });
    
      
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        
      {
        'title': 'Go Hospitality',
        'message': 'Go Hospitality App access to your location '
      }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) 
      {
       this.findCoordinates();
      } else {
        alert("Permission denied")
      }
    } catch (err) {
      console.warn(err)
      }
    }


  openLocationSetting()
  {
    AndroidOpenSettings.locationSourceSettings();
    
  }
  findCoordinates = () => 
  {
    this.setState({isLoadingLocation:true});
    Geolocation.getCurrentPosition(
        (position) => 
        {
            const location = position;
            this.setState({location});
            this.setState({isLoadingLocation:false});
            if(this.state.location != null)
            {
            var coordinates ={"lat":this.state.location.coords.latitude,"long":this.state.location.coords.longitude};
            this.setState({coordinates});
            }
        },
        (error) => 
        {
            this.setState({isLoadingLocation:false});
            this.setState({isException:true});
            this.setState({coordinates:null});
            // Alert.alert(
            //     null,
            //     error.code+"test",
            //     [               
            //       {text: 'Ok', onPress: () => this.props.navigation.goBack()},
            //     ],
            //     {cancelable: false},
            //   );
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };
  renderCategory()
  {
      if(this.state.coordinates != null)
      {
        return (
            <Content>
              <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
                <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                                  <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
                  </Button>
                </Left>
                <Body>
                 <Title style={{color:"#000",fontSize:18,alignSelf:'flex-end',fontFamily: 'Cochin'}}>Nearest</Title>
                </Body>
                <Right />
              </Header>
            
                  <Content >
                  <View style={{flex:1,flexDirection:"column"}}>
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
           style={styles.col} onPress={()=>this.props.navigation.navigate('NearestHotel',{coordinates:this.state.coordinates})}>
          <View >
         <Icon name="local-hotel" style={{ color: "white",alignSelf:"center",borderRadius:50,padding:8,color:"#F05742",backgroundColor:"#fff",elevation:1 }} size={30} />
                <Text numberOfLines={1} style={styles.iconText}>
                  Hotel
                </Text>
         </View>
          </TouchableHighlight>
        
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
           style={styles.col} onPress={()=>this.props.navigation.navigate('NearestRestraunt',{coordinates:this.state.coordinates})}>
          <View >
          <Icon name="restaurant" style={{ color: "white",alignSelf:"center",borderRadius:50,padding:8,color:"#F05742",backgroundColor:"#fff",elevation:1 }} size={30}/>
                <Text numberOfLines={1} style={styles.iconText}>
                Restaurant
                </Text>
         </View>
          </TouchableHighlight>
        </View>
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
           style={styles.col}  onPress={()=>this.props.navigation.navigate('NearestGuestHouse',{coordinates:this.state.coordinates})}>
          <View >
          <Icon name="vpn-key" style={{ color: "white",alignSelf:"center",borderRadius:50,padding:8,color:"#F05742",backgroundColor:"#fff",elevation:1 }} size={30}/>
                <Text numberOfLines={2} style={styles.iconText}>
                Guest House
                </Text>  
         </View>
          </TouchableHighlight>
        
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
           style={styles.col} onPress={()=>this.props.navigation.navigate('NearestEvent',{coordinates:this.state.coordinates})}>
          <View >
          <Icon name="local-movies" style={{ color: "white",alignSelf:"center",borderRadius:50,padding:8,color:"#F05742",backgroundColor:"#fff",elevation:1 }} size={30}/>
                <Text numberOfLines={1} style={styles.iconText}>
                Event
                </Text>
         </View>
          </TouchableHighlight>
        </View>
       
       </View>
    
               
                       {/* <MapView
      // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude:parseFloat(this.state.location.coords.latitude),
         longitude: parseFloat(this.state.location.coords.longitude),
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
       minZoomLevel={17}
      
     >
        {/* <MapView.Marker
            coordinate={{latitude:  parseFloat(location[0]),
            longitude:parseFloat(location[1])}}
            title={'demmo'}
           
         />        
     </MapView>   */}
                  </Content>  
             
                  </Content>     
          );  
      }
  }
  render() {
    if(this.state.isLoadingLocation)
    {
        return(
          <ProgressLoader headerText="Getting Location..."/>

        )
      }
      if(this.state.isException){
        return(
          
          <Exception />
          
        )
      }
    return (
      <Container style={styles.container} >
      {this.renderCategory()}
      </Container>
    );
  }
}

export default NearestCategoryList;
