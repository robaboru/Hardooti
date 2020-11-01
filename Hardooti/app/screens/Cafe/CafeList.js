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
class CafeList extends Component {
  
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isLoadingMore:false,
      isException:false,
      cafes:[],
      connection_Status : "",
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/cafe/getAll/',
      searchTerm:"",
      offset:1,
      isSearchResultNull:false,
      cafeCity:this.props.city
    }
    
    this.cafeResponse=null;
    this.loadMorecafes = this.loadMorecafes.bind(this);
    this.abortController = new AbortController();

 
  }

  searchCafe()
  {
    if(this.state.searchTerm != "")
    {
      Keyboard.dismiss();
      this.setState({isLoading:true});

      this.searchCafesFromApi().done();
    }
  }
  async  searchCafesFromApi() {
    try 
    {
      this.abortController = new AbortController();
      let response = await fetch(
        this.state.baseUrl+'/api/searchCafe/cafe/'+this.state.searchTerm,
        {
          method: 'GET',
          signal: this.abortController.signal,
        }
      );
      let responseJson = await response.json();
      this.setState({isLoading:false});
      this.setState({cafes:responseJson.cafes});
      this.setState({searchResult:responseJson.cafes});
      if(this.state.cafes.length < 1)
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
  async  getCafesFromApi() {
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
      this.cafeResponse = responseJson;
      this.setState({isLoading:false});
      this.setState({cafes:responseJson.cafes});
     
      return responseJson;
    } catch (error) 
    {
      if (error.name != 'AbortError') 
      {
        this.setState({isException:true});
      }
    }
  }
  async  getMoreCafesFromApi() {
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
      this.cafeResponse = responseJson;
      this.setState({isLoadingMore:false});
     
      if(responseJson.cafes.length  > 0)
      {
        this.setState({cafes:this.state.cafes.concat(responseJson.cafes)});
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
    if(this.state.cafeCity != null)
    {
    this.state.relativeUrl ='/api/searchCafeByCity/cafe/'+this.state.cafeCity+"/"+this.state.offset;
    }
    if(this.state.connection_Status == "Online")
    {
    this.getCafesFromApi().done();
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
        this.getCafesFromApi().done();
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
  loadMorecafes()
  {
    this.setState({offset:this.state.offset++});
    this.state.relativeUrl = '/api/cafe/getAll/'+this.state.offset;
    this.setState({isLoadingMore:true});
    this.getMoreCafesFromApi().done();
  }
  renderLoadMore()
  {
    if(this.state.isLoadingMore)
    {
  return( <Spinner color='#F05742' style={{flex: 1}}/>);
    }
    if(this.state.isException){
        return(
          
          <Exception />
          
        )
      }
    if(this.cafeResponse.count > 20 && !this.state.isLoadingMore && this.state.cafes.length < this.cafeResponse.count)
    {
  return(
  <Button transparent style={{flexDirection:"row",alignSelf:"center"}} onPress={this.loadMorecafes}>
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
        <ProgressLoader headerText="Loading Cafes..."/>
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
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Cafe</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
           
            <Input placeholder="Search Cafe" 
            onSubmitEditing={()=>this.sea()}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            />   
            <Button transparent onPress={()=>this.searchCafe()}>
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
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Cafe</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
           
            <Input placeholder="Search Cafe" 
            onSubmitEditing={()=>this.searchCafe()}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            />   
            <Button transparent onPress={()=>this.searchCafe()}>
            <Icon active name="search" style={{color:"#F05742"}} />  
          </Button>              
          </Item>
          <Button transparent style={{flexDirection:"row",alignSelf:"flex-end"}} onPress={()=>this.props.navigation.navigate('CafeSearchByCity')}>
            <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>Search by city</Text>
          </Button>
               {
    this.state.cafes.map((cafe, key) => (
   
    <TouchableHighlight onPress={()=>this.props.navigation.navigate('CafeDrinkMenuList',{cafe:cafe})} key={key}> 
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
            <CardItem>
            <Left style={{flex:0.9}}>
           <Thumbnail square source={{uri:this.state.baseUrl+cafe.photo}} style={{width:'100%',height:120}}  />        
            </Left>
              <Body style={styles.ListTextContainer}>
              <Text style={styles.headerText}>
              {cafe.name}
            </Text>
            <Text numberOfLines={1} note>
                 {cafe.address}
            </Text> 
                       
           {/* { this.renderRating(cafe.rating)}          */}
            
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

export default withNavigation(CafeList);