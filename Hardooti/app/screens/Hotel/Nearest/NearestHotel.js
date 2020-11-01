import React, { Component } from "react";
import { ActivityIndicator,TouchableHighlight,Alert,Linking,Keyboard,AsyncStorage  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Card,
  Footer,
  FooterTab,
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
import styles from "./styles";
import HotelService from '../HotelServices';
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { withNavigation } from 'react-navigation';
import HttpService from "../../../services/HttpService";
import ProgressLoader from "../../common/ProgressLoader";
import Exception from "../../common/Exception";
import CustomMenuIcon from "../../common/SideMenuPopUp/CustomMenuIcon ";
import SkeletonLoader from "../../common/SkeletonLoader";
class NearestHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location:null,
      isLoadingHotel:true,
      isException:false,
      hotels:[],
      baseUrl:HttpService.baseUrl,
      relativeUrl:"",
      currency:'ETB'
    };
    this.abortController = new AbortController();

  }
  async  getNearestHotelsFromApi() {
    try 
    {
      this.abortController = new AbortController();
      let response = await fetch(
        this.state.baseUrl+this.state.relativeUrl,
        {
          method: 'GET',
          signal: this.abortController.signal,
      }
      );
      let responseJson = await response.json();
      this.hotelResponse = responseJson;
      this.setState({isLoadingHotel:false});
      this.setState({hotels:responseJson.hotels});
      return responseJson;
    } catch (error) 
    {
        this.setState({isLoadingHotel:false});
        if (error.name != 'AbortError') 
        {
          this.setState({isException:true});
        }
    }
  }
 
  componentDidMount()
  {
    AsyncStorage.getItem('currency').then((value) => 
   {
     if(value !=null)
     {
     this.setState({ currency: value });
     }
     else{
       this.setState({ currency: 'ETB' }); 
       AsyncStorage.setItem('currency', 'ETB');
     }
   });
    const { navigation } = this.props;
    var coordinates  = navigation.getParam('coordinates', null);
    this.state.relativeUrl="/api/nearest_hotel/"+coordinates.lat+"/"+coordinates.long;
    this.getNearestHotelsFromApi().done();
  }
  componentWillUnmount() 
  {
    // Cancel request
    if(this.state.isLoadingHotel)
    {
      this.abortController.abort();    
    }
  }

  
  renderRate(rate)
  {
    if(rate !="" && rate != null)
    {
      return( 
      <Body style={{flexDirection:"row",alignSelf:"flex-start"}}>
      <Text>
       {rate} 
      </Text> 
      <Icon name="star"  style={{fontSize:16,color:"green"}}/>           
      </Body>
       );
    }
  }
  changeCurrency()
  {
    if(this.state.currency == "ETB")
    {
      this.setState({currency:'USD'});
      AsyncStorage.setItem('currency', 'USD');
    }
    else
    {
      this.setState({currency:'ETB'});
      AsyncStorage.setItem('currency', 'ETB');
    }
  }
  renderPrice(price,priceUSD,roomName)
  {
 if(price != "" && price != null && priceUSD != "" && priceUSD != null && roomName!= "" && roomName != null)
 {
  if(price != "" && price != null)
  {
    if(this.state.currency == "ETB")
    {
    return(<Right style={{flexDirection:"column",alignSelf:"flex-end"}}>
    <Text style={{fontWeight:'bold',fontFamily: 'Cochin'}}>{"ETB "+price}</Text>
    <Text note >{"per night | "+roomName}</Text>
    </Right>);
    }
    else
    {
      return(<Right style={{flexDirection:"column",alignSelf:"flex-end"}}>
      <Text style={{fontWeight:'bold',fontFamily: 'Cochin'}}>{"USD "+priceUSD}</Text>
      <Text note >{"per night | "+roomName}</Text>
      </Right>);
    }
  }
 }

  }
  renderCurrencyMenu()
  {
    if(this.state.hotels.length > 0)
  {
    return(
      <Right>
           <CustomMenuIcon
          //Menu Text
          menutext="Menu"
          //Menu View Style
          menustyle={{
            marginRight: 0,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
          //Menu Text Style
          textStyle={{
            color: 'black',
          }}
          //Click functions for the menu items
          option1Click={() => {
            this.changeCurrency();
          }}
          currency={this.state.currency}
        />
           </Right>
    );
  }
  else{
    return(<Right />);
  }
  }
renderFooter()
{
  if(this.state.hotels.length > 0)
  {
    return(<Footer >
      <FooterTab style={{backgroundColor:"white"}}>
        <Button></Button>
        <Button active={false} onPress={() => this.props.navigation.navigate('NearestHotelMap',{hotels:this.state.hotels})}>
          <Icon active={false} name="map" size={20} style={{color:"gray"}}/>
          <Text style={{color:"#000",textTransform:"capitalize",fontSize:16}}>View in map</Text>
        </Button>  
      </FooterTab>
    </Footer>);
  }
}
  renderNearestHotels()
  {
      if(this.state.hotels.length > 0)
      {
      return(
        <Content>                    
        {
this.state.hotels.map((hotel, key) => ( 
<TouchableHighlight
activeOpacity={0.6}
underlayColor="#DDDDDD"
 onPress={()=>this.props.navigation.navigate('HotelDetail',{hotel:hotel})} key={key}> 
   <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
     <CardItem>
     <Left style={{flex:0.9}}>
    <Thumbnail square source={{uri:this.state.baseUrl+hotel.photo}} style={{width:'100%',height:120,position:'relative',top:-9}}  />        
     </Left>
       <Body style={styles.hotelListTextContainer}>
       <Text style={styles.headerText}>
       {hotel.name}
     </Text>
     <Text numberOfLines={2} note>
          {hotel.address}
     </Text>   
     <Text numberOfLines={1} note>
          {hotel.distance_km +" km"}
     </Text>  
      {this.renderRate(hotel.rating)}
     {this.renderPrice(hotel.price_etb,hotel.price_usd,hotel.room_name)}                 
     
       </Body>                                  
     </CardItem>                          
   </Card>
   </TouchableHighlight> 
           ))
    }
   
 </Content> 
      );
  }
  else
  {
    <Content>
      <Text style={{padding:10}}>Couldn't find nearest hotel.</Text>  
    </Content>
  }
  }
  
  render() {
   
    if(this.state.isLoadingHotel)
    {
        return(
          <SkeletonLoader headerText="Loading Hotels..."/>

        )
      }
      if(this.state.isException){
        return(
          
          <Exception />
          
        )
      }
      if(this.state.isLoadingLocation)
    {
        return(
          <Container >
             <Header style={{backgroundColor:"#fff"}} androidStatusBarColor="#F05742">
            <Left>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
                              <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
              </Button>
            </Left>
            <Body>
              <Title style={{color:"#000",fontSize:16,alignSelf:'flex-end',fontFamily: 'Cochin'}}>Getting location...</Title>
            </Body>
            <Right />
          </Header>       
                 
            <Spinner color='#F05742' style={{flex: 1}}/>
          </Container>
        )
      }
    return (
        <Container style={styles.container}>
        <Header style={{backgroundColor:"#fff",}} androidStatusBarColor="#F05742">
           <Left>
           <Button transparent onPress={()=>this.props.navigation.goBack()}>
                             <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
             </Button>
           </Left>
           <Body>
             <Title style={{color:"#000",fontSize:16,fontFamily: 'Cochin'}}>Available Hotels</Title>
           </Body>
          {/* {this.renderCurrencyMenu()} */}
         </Header>
           {this.renderNearestHotels()}
           {this.renderFooter()}
       </Container>
    );
    }
  
}

export default NearestHotel;
