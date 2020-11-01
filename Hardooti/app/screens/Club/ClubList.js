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
class ClubList extends Component {
  
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isLoadingMore:false,
      isException:false,
      clubs:[],
      connection_Status : "",
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/club/getAll/',
      searchTerm:"",
      offset:1,
      isSearchResultNull:false,
      clubCity:this.props.city
    }
    
    this.clubResponse=null;
    this.loadMoreClubs = this.loadMoreClubs.bind(this);
    this.abortController = new AbortController();

 
  }

  searchClub()
  {
    if(this.state.searchTerm != "")
    {
      Keyboard.dismiss();
      this.setState({isLoading:true});

      this.searchClubsFromApi().done();
    }
  }
  async  searchClubsFromApi() {
    try 
    {
      this.abortController = new AbortController();
      let response = await fetch(
        this.state.baseUrl+'/api/searchClub/'+this.state.searchTerm,
        {
          method: 'GET',
          signal: this.abortController.signal,
        }
      );
      let responseJson = await response.json();
      this.setState({isLoading:false});
      this.setState({clubs:responseJson.clubs});
      this.setState({searchResult:responseJson.clubs});
      if(this.state.clubs.length < 1)
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
  async  getClubsFromApi() {
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
      this.clubResponse = responseJson;
      this.setState({isLoading:false});
      this.setState({clubs:responseJson.clubs});
     
      return responseJson;
    } catch (error) 
    {
      if (error.name != 'AbortError') 
      {
        this.setState({isException:true});
      }
    }
  }
  async  getMoreClubsFromApi() {
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
      this.clubResponse = responseJson;
      this.setState({isLoadingMore:false});
     
      if(responseJson.clubs.length  > 0)
      {
        this.setState({clubs:this.state.clubs.concat(responseJson.clubs)});
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
    if(this.state.clubCity != null)
    {
    this.state.relativeUrl ='/api/searchClubByCity/'+this.state.clubCity;
    }
    if(this.state.connection_Status == "Online")
    {
    this.getClubsFromApi().done();
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
        this.getClubsFromApi().done();
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
  loadMoreClubs()
  {
    this.setState({offset:this.state.offset++});
    this.state.relativeUrl = '/api/club/getAll/'+this.state.offset;
    this.setState({isLoadingMore:true});
    this.getMoreClubsFromApi().done();
  }
  renderLoadMore()
  {
    if(this.state.isLoadingMore)
    {
  return( <Spinner color='#F05742' style={{flex: 1}}/>);
    }
    if(this.clubResponse.count > 20 && !this.state.isLoadingMore && this.state.clubs.length < this.clubResponse.count)
    {
  return(
  <Button transparent style={{flexDirection:"row",alignSelf:"center"}} onPress={this.loadMoreClubs}>
  <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>See more</Text>
</Button>);
    }
  }
  // renderRating(rate)
  //   {
  //       if(rate != "")
  //       {
  //           return(
  //               <Body style={{flexDirection:"row",alignSelf:"flex-start"}}>
  //                 <Text>
  //                 {rate}
  //                </Text> 
  //                <Icon name="star"  style={{fontSize:16,color:"green"}}/> 
  //                </Body>
  //                 ); 
  //       }
  //   }
  render() {
    if(this.state.connection_Status == "Online")
    {
    if(this.state.isLoading){
      return(
        <ProgressLoader headerText="Loading Clubs..."/>
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
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Club</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
           
            <Input placeholder="Search Club" 
            onSubmitEditing={()=>this.searchClub()}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            />   
            <Button transparent onPress={()=>this.searchClub()}>
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
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Club</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
           
            <Input placeholder="Search Club" 
            onSubmitEditing={()=>this.searchClub()}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            />   
            <Button transparent onPress={()=>this.searchClub()}>
            <Icon active name="search" style={{color:"#F05742"}} />  
          </Button>              
          </Item>
          <Button transparent style={{flexDirection:"row",alignSelf:"flex-end"}} onPress={()=>this.props.navigation.navigate('ClubSearchByCity')}>
            <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>Search by city</Text>
          </Button>
               {
    this.state.clubs.map((club, key) => (
   
    <TouchableHighlight onPress={()=>this.props.navigation.navigate('ClubLocation',{club:club})} key={key}> 
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
            <CardItem>
            <Left style={{flex:0.9}}>
           <Thumbnail square source={{uri:this.state.baseUrl+club.photo}} style={{width:'100%',height:120}}  />        
            </Left>
              <Body style={styles.ListTextContainer}>
              <Text style={styles.headerText}>
              {club.name}
            </Text>
            <Text numberOfLines={1} note>
                 {club.address}
            </Text> 
                         
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

export default withNavigation(ClubList);