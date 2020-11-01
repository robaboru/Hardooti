import React, { Component } from "react";
import { ActivityIndicator,TouchableHighlight,Alert,Linking,Keyboard  } from 'react-native';
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
import { withNavigation } from 'react-navigation';
import HttpService from "../../services/HttpService";
import ProgressLoader from "../common/ProgressLoader";
import SkeletonLoader from "../common/SkeletonLoader";
class GuestHouseList extends Component {
  
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isLoadingMore:false,
      guestHouses:[],
      connection_Status : "",
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/guestHouse/getAll/',
      searchTerm:"",
      offset:1,
      isSearchResultNull:false,
      guestHouseCity:this.props.city
    }
    
    this.guestHouseResponse=null;
    this.loadMoreGuestHouses = this.loadMoreGuestHouses.bind(this);
    this.abortController = new AbortController();

 
  }

  searcheGuestHouse()
  {
    if(this.state.searchTerm != "")
    {
      Keyboard.dismiss();
      this.setState({isLoading:true});

      this.searchGuestHousesFromApi().done();
    }
  }
  async  searchGuestHousesFromApi() {
    try 
    {
      this.abortController = new AbortController();
      let response = await fetch(
        this.state.baseUrl+'/api/searchGuestHouse/GuestHouse/'+this.state.searchTerm,
        {
          method: 'GET',
          signal: this.abortController.signal,
        }
      );
      let responseJson = await response.json();
      this.setState({isLoading:false});
      this.setState({guestHouses:responseJson.guest_houses});
      this.setState({searchResult:responseJson.guest_houses});
      if(this.state.guestHouses.length < 1)
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
        Alert.alert(
          null,
          'Unable to load please try again...',
          [               
            {text: 'Ok', onPress: () => this.props.navigation.goBack()},
          ],
          {cancelable: false},
        );
      }
    }
  }
  async  getGuestHousesFromApi() {
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
      this.guestHouseResponse = responseJson;
      this.setState({isLoading:false});
      this.setState({guestHouses:responseJson.guest_houses});
     
      return responseJson;
    } catch (error) 
    {
      if (error.name != 'AbortError') 
      {
        Alert.alert(
          null,
          'Unable to load please try again...',
          [               
            {text: 'Ok', onPress: () => this.props.navigation.goBack()},
          ],
          {cancelable: false},
        );
      }
    }
  }
  async  getMoreGuestHousesFromApi() {
    
    try 
    {
      this.abortController = new AbortController();
      let response = await fetch(
        this.state.baseUrl+ this.state.relativeUrl,
        {
          method: 'GET',
          signal: this.abortController.signal,
        }
      );
      let responseJson = await response.json();
      this.guestHouseResponse = responseJson;
     
      this.setState({isLoadingMore:false});
     
      if(responseJson.guest_houses.length  > 0)
      {
        this.setState({guestHouses:this.state.guestHouses.concat(responseJson.guest_houses)});
      }
      return responseJson;
    } catch (error) 
    {
      this.setState({isLoadingMore:false});
      if (error.name != 'AbortError') 
      {
        Alert.alert(
          null,
          'Unable to load please try again...',
          [               
            {text: 'Ok', onPress: () => this.props.navigation.goBack()},
          ],
          {cancelable: false},
        );
      }
    }
  }
  componentWillUnmount() 
  {
    if(this.state.isLoading || this.state.isLoadingMore)
    {
      this.abortController.abort(); 
    }      
  }
  componentDidMount()
  {
    this.state.relativeUrl = this.state.relativeUrl+this.state.offset;
    if(this.state.guestHouseCity != null)
    {
    this.state.relativeUrl ='/api/searchGuestHouseByCity/GuestHouse/'+this.state.guestHouseCity;
    }
    if(this.state.connection_Status == "Online")
    {
    this.getGuestHousesFromApi().done();
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
        this.getGuestHousesFromApi().done();
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
  loadMoreGuestHouses()
  {
    this.setState({offset:this.state.offset++});
    this.state.relativeUrl = '/api/guestHouse/getAll/'+this.state.offset;
    this.setState({isLoadingMore:true});
    this.getMoreGuestHousesFromApi().done();
  }
  renderLoadMore()
  {
    if(this.state.isLoadingMore)
    {
  return( <Spinner color='#F05742' style={{flex: 1}}/>);
    }
    if(this.guestHouseResponse.count > 20 && !this.state.isLoadingMore && this.state.guestHouses.length < this.guestHouseResponse.count)
    {
  return(
  <Button transparent style={{flexDirection:"row",alignSelf:"center"}} onPress={this.loadMoreGuestHouses}>
  <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>See more</Text>
</Button>);
    }
  }
  renderRating(rate)
    {
        if(rate != "")
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
  render() {
    if(this.state.connection_Status == "Online")
    {
    if(this.state.isLoading){
      return(
        <SkeletonLoader headerText="Loading Guest Houses..."/>
      )
    }
    if(this.state.isSearchResultNull){
      return(
        <Container >
           <Header style={{backgroundColor:"#fff"}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color:"#F05742"}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Guest House</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
           
            <Input placeholder="Search Guest House" 
            onSubmitEditing={()=>this.searcheGuestHouse()}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            />   
            <Button transparent onPress={()=>this.searcheGuestHouse()}>
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
       <Header style={{backgroundColor:"#fff"}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color:"#F05742"}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Guest House</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
           
            <Input placeholder="Search Guest House" 
            onSubmitEditing={()=>this.searcheGuestHouse()}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            />   
            <Button transparent onPress={()=>this.searcheGuestHouse()}>
            <Icon active name="search" style={{color:"#F05742"}} />  
          </Button>              
          </Item>
          <Button transparent style={{flexDirection:"row",alignSelf:"flex-end"}} onPress={()=>this.props.navigation.navigate('GuestHouseSearchByCity')}>
            <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>Search by city</Text>
          </Button>
               {
    this.state.guestHouses.map((guestHouse, key) => (
   
    <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
     onPress={()=>this.props.navigation.navigate('GuestHouseRoomList',{guestHouse:guestHouse})} key={key}> 
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
            <CardItem>
            <Left style={{flex:0.7}}>
           <Thumbnail square source={{uri:this.state.baseUrl+guestHouse.photo}} style={{width:'100%',height:80}}  />        
            </Left>
              <Body style={styles.ListTextContainer}>
              <Text style={styles.headerText}>
              {guestHouse.name}
            </Text>
            <Text numberOfLines={1} note>
                 {guestHouse.address}
            </Text> 
                       
           { this.renderRating(guestHouse.rating)}         
            
          <Right/>
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

export default withNavigation(GuestHouseList);