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
import Exception from "../common/Exception";
import SkeletonLoader from "../common/SkeletonLoader";
class RestaurantList extends Component {
  
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isLoadingMore:false,
      isException:false,
      restaurants:[],
      connection_Status : "",
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/restaurant/getAll/',
      searchTerm:"",
      offset:1,
      isSearchResultNull:false,
      restaurantCity:this.props.city

    }
    this.restaurantResponse=null;
    this.loadMoreRestaurants = this.loadMoreRestaurants.bind(this);
    this.abortController = new AbortController();

 
  }

  searchRestaurant()
  {
    if(this.state.searchTerm != "")
    {
      Keyboard.dismiss();
      this.setState({isLoading:true});

      this.searchRestaurantsFromApi().done();
    }
  }
  async  searchRestaurantsFromApi() {
    try 
    {
      this.abortController = new AbortController();
      let response = await fetch(
        this.state.baseUrl+'/api/restaurant/search_restaurant/'+this.state.searchTerm,
        {
          method: 'GET',
          signal: this.abortController.signal,
        }
      );
      let responseJson = await response.json();
      this.setState({isLoading:false});
      this.setState({restaurants:responseJson.restaurants});
      this.setState({searchResult:responseJson.restaurants});
      if(this.state.restaurants.length < 1)
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
  async  getRestaurantsFromApi() {
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
      this.restaurantResponse = responseJson;
      this.setState({isLoading:false});
      this.setState({restaurants:responseJson.restaurants});
      return responseJson;
    } catch (error) 
    {
      await this.setState({isLoading:false});

      if (error.name != 'AbortError') 
      {
        this.setState({isException:true});
      }
    }
  }
  async  getMoreRestaurantsFromApi() {
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
      this.restaurantResponse = responseJson;
      this.setState({isLoadingMore:false});
      if(responseJson.restaurants.length  > 0)
      {
        this.setState({restaurants:this.state.restaurants.concat(responseJson.restaurants)});
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
    if(this.state.isLoading || this.state.isLoadingMore)
    {
      this.abortController.abort(); 
    }      
  }
  componentDidMount()
  {
    this.state.relativeUrl = this.state.relativeUrl+this.state.offset;
    if(this.state.restaurantCity != null)
    {
    this.state.relativeUrl ='/api/restaurant/searchRestaurantByCity/'+this.state.restaurantCity+"/"+this.state.offset;
    }
    if(this.state.connection_Status == "Online")
    {
    this.getRestaurantsFromApi().done();
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
        this.getRestaurantsFromApi().done();
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
  loadMoreRestaurants()
  {
    this.setState({offset:this.state.offset++});
    this.state.relativeUrl = '/api/restaurant/getAll/'+this.state.offset;
    this.setState({isLoadingMore:true});
    this.getMoreRestaurantsFromApi().done();
  }
  renderLoadMore()
  {
    if(this.state.isLoadingMore)
    {
  return( <Spinner color='#F05742' style={{flex: 1}}/>);
    }
    if(this.restaurantResponse.count > 20 && !this.state.isLoadingMore && this.state.restaurants.length < this.restaurantResponse.count)
    {
  return(
  <Button transparent style={{flexDirection:"row",alignSelf:"center"}} onPress={this.loadMoreRestaurants}>
  <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>See more</Text>
</Button>);
    }
  }
  renderRating(rate)
  {
    if(rate != null && rate != "")
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
        <SkeletonLoader headerText="Loading Restaurants..."/>
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
           <Header style={{backgroundColor:"#fff"}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color:"#F05742"}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Restaurants</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
           
            <Input placeholder="Search Restaurant" 
            onSubmitEditing={()=>this.searchRestaurant()}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            />   
            <Button transparent onPress={()=>this.searchRestaurant()}>
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
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Restaurants</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
           
            <Input placeholder="Search Restaurant" 
            onSubmitEditing={()=>this.searchRestaurant()}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            />   
            <Button transparent onPress={()=>this.searchRestaurant()}>
            <Icon active name="search" style={{color:"#F05742"}} />  
          </Button>              
          </Item>
          <Button transparent style={{flexDirection:"row",alignSelf:"flex-end"}} onPress={()=>this.props.navigation.navigate('RestaurantSearchByCity')}>
            <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>Search by city</Text>
          </Button>
               {
    this.state.restaurants.map((l, key) => (
   
    <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onPress={()=>this.props.navigation.navigate('RestaurantMealMenu',{restaurant:l})} key={key}> 
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
            <CardItem>
            <Left style={{flex:0.7}}>
           <Thumbnail square source={{uri:this.state.baseUrl+l.photo}} style={{width:'100%',height:80}}  />        
            </Left>
              <Body style={styles.ListTextContainer}>
              <Text style={styles.headerText}>
              {l.name}
            </Text>
            <Text numberOfLines={1} note>
                 {l.address}
            </Text>                    
            {this.renderRating(l.rating)}
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

export default withNavigation(RestaurantList);