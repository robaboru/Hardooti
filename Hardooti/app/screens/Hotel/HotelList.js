import React, { Component } from "react";
import { ActivityIndicator,TouchableHighlight,Alert,Linking,Keyboard,AsyncStorage  } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AndroidOpenSettings from 'react-native-android-open-settings';
import DeviceInfo from 'react-native-device-info';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
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
import styles from "./styles";
import HotelService from './HotelServices';
import ProgressLoader from '../common/ProgressLoader';
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { withNavigation } from 'react-navigation';
import HttpService from "../../services/HttpService";
import Exception from "../common/Exception";
import CustomMenuIcon from "../common/SideMenuPopUp/CustomMenuIcon ";
import SkeletonLoader from "../common/SkeletonLoader";
class HotelList extends Component {
  
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isException:false,
      isLoadingMore: false,
      hotels:[],
      connection_Status : "",
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/hotel/getAll/',
      searchTerm:"",
      offset:1,
      isSearchResultNull:false,
      hotelCity:this.props.city,
      currency:'ETB'
    }
    this.loadMoreHotels = this.loadMoreHotels.bind(this);
     this.offset = 1;
    this.defaultRelativeUrl ='/api/hotel/getAll/'+this.offset;
    this.abortController = new AbortController();
  this.hotelResponse=null;
  }

  searchHotel()
  {
    if(this.state.searchTerm != "")
    {
      Keyboard.dismiss();
      this.setState({isLoading:true});

      this.searchHotelsFromApi().done();
    }
  }
  async  searchHotelsFromApi() {
    try 
    {
      this.abortController = new AbortController();
      let response = await fetch(
        this.state.baseUrl+'/api/hotel/searchHotel/'+this.state.searchTerm,
        {
          method: 'GET',
          signal: this.abortController.signal,
      }
      );
      let responseJson = await response.json();
      this.setState({isLoading:false});
      this.setState({hotels:responseJson.hotels});
      this.setState({searchResult:responseJson.hotels});
      if(this.state.hotels.length < 1)
      {
        this.setState({isSearchResultNull:true});
      }
      else
      {
        this.setState({isSearchResultNull:false});
      }
      return responseJson;
    } catch (error) 
    {
      this.setState({isLoading:false});
      if (error.name != 'AbortError') 
      {
       this.setState({isException:true});
      }
    }
  }
  async  getHotelsFromApi() {
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
      this.setState({isLoading:false});
      this.setState({hotels:responseJson.hotels});
      return responseJson;
    } catch (error) 
    {
      this.setState({isLoading:false});
      if (error.name != 'AbortError') 
      {
        this.setState({isException:true});

      }
    }
  }
  onCancelButtonClicked()
  {

  }
  async  getMoreHotelsFromApi() {
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
      this.setState({isLoadingMore:false});
      if(responseJson.hotels.length  > 0)
      {
        this.setState({hotels:this.state.hotels.concat(responseJson.hotels)});
      }
      return responseJson;
    } catch (error) 
    {
      this.setState({isLoadingMore:false});
      if (error.name != 'AbortError') 
      {
        this.setState({isException:true});
      }
    }
  }
  componentWillUnmount() 
  {
    // Cancel request   
    if(this.state.isLoading || this.stata.isLoadingMore)
    {
      this.abortController.abort();  
    }
  }
  componentDidMount()
  {
   this.state.relativeUrl = this.state.relativeUrl+this.state.offset;
 
    if(this.state.hotelCity != null)
    {
    this.state.relativeUrl ='/api/hotel/searchHotelByCity/'+this.state.hotelCity+"/"+this.state.offset;
   
    }
    
    if(this.state.connection_Status == "Online")
    {
      
    this.getHotelsFromApi().done();
    
    }
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange

  );
 
  NetInfo.isConnected.fetch().done((isConnected) => {

    if(isConnected == true)
    {
      this.setState({connection_Status : "Online"})    
    }
    else
    {
      this.setState({connection_Status : "Offline"})
    }

  });
 
  }
  gotoSetting()
  {
    AndroidOpenSettings.wifiSettings();
  }
  componentWillUnmount() {

    NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange
    );

  }
  _handleConnectivityChange = (isConnected) => {

    if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
        this.getHotelsFromApi().done();
      }
      else
      {
        this.setState({connection_Status : "Offline"});
        Alert.alert(
          'Internet Connection',
          'Unable to connect please check your internet connection setting.',
          [
            {
              text: 'Cancel',
              onPress: () => this.props.navigation.goBack(),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.gotoSetting()},
          ],
          {cancelable: false},
        );
        this.props.navigation.goBack();
      }
  };
  loadMoreHotels()
  {
    this.setState({offset:this.state.offset++});
    if(this.state.hotelCity != null)
    {
    this.state.relativeUrl ='/api/hotel/searchHotelByCity/'+this.state.hotelCity+'/'+this.state.offset;
    }
    this.state.relativeUrl ='/api/hotel/getAll/'+this.state.offset;

    this.setState({isLoadingMore:true});
    this.getMoreHotelsFromApi().done();
  }
  renderLoadMore()
  {
    if(this.state.isLoadingMore)
    {
  return( <Spinner color='#F05742' style={{flex: 1}}/>);
    }
    if(this.hotelResponse != null)
    {
    if(this.hotelResponse.count > 20 && !this.state.isLoadingMore && this.state.hotels.length < this.hotelResponse.count)
    {
  return(
  <Button transparent style={{flexDirection:"row",alignSelf:"center"}} onPress={this.loadMoreHotels}>
  <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>See more</Text>
</Button>);
    }
  }
  }
  renderRating(rate)
  {
    if(rate !="" && rate != null)
    {
      return( <Body style={{flexDirection:"row",alignSelf:"flex-start"}}>
      <Text>
       {rate}
      </Text> 
      <Icon name="star"  style={{fontSize:16,color:"green"}}/>           
      </Body> );
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
    if(price != "" && price != null && priceUSD != "" && priceUSD != null)
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
  render() {
    if(this.state.connection_Status == "Online")
    {
    if(this.state.isLoading){
      return(
        
        <SkeletonLoader headerText="Loading Hotels..."/>
        
      )
    }
    if(this.state.isException){
      return(
        
        <Exception />
        
      )
    }
    if(this.state.isSearchResultNull){
      return(
        <Container >
           <Header style={{backgroundColor:"#fff",elevation:1}} androidStatusBarColor="#">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
          </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"flex-end",fontFamily: 'Cochin'}}>Available Hotels</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
           
            <Input placeholder="Search Hotel" 
            onSubmitEditing={()=>this.searchHotel()}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            />   
            <Button transparent onPress={()=>this.searchHotel()}>
            <Icon active name="search" style={{color:"#F05742"}} />  
          </Button>              
          </Item>
          <Text style={{padding:10}}>Search result not found.</Text>
          </Content>
        </Container>
      )
    }
    return (
      <Container style={styles.container}>
       <Header style={{backgroundColor:"#fff",elevation:1}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
                           <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Available Hotels</Title>
          </Body>
          <Right>
          {/* <CustomMenuIcon
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
        /> */}
          </Right>
        </Header>
        <Content>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
           
            <Input placeholder="Search Hotel" 
            onSubmitEditing={()=>this.searchHotel()}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            />   
            <Button transparent onPress={()=>this.searchHotel()}>
            <Icon active name="search" style={{color:"#F05742"}} />  
          </Button>              
          </Item>
          <Button transparent style={{flexDirection:"row",alignSelf:"flex-end"}} onPress={()=>this.props.navigation.navigate('HotelSearchByCity')}>
            <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>Search by city</Text>
          </Button> 
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
            {this.renderRating(hotel.rating)}
            {this.renderPrice(hotel.price_etb,hotel.price_usd,hotel.room_name)}
            
              </Body>                                  
            </CardItem>                          
          </Card>
          </TouchableHighlight> 
                  ))
           }
           {this.renderLoadMore()}
        </Content>    
      </Container>

    );
  }
  
    return(
      <Container>

      </Container>
    )
  
}
}

export default withNavigation(HotelList);
