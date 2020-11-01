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
import ProgressLoader from '../common/ProgressLoader';
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { withNavigation } from 'react-navigation';
import Exception from "../common/Exception";
import HttpService from "../../services/HttpService";
import SkeletonLoader from "../common/SkeletonLoader";
class TourAgencyList extends Component {
  
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isException:false,
      isLoadingMore: false,
      tourAgencies:[],
      connection_Status : "",
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/tour/getAll/',
      searchTerm:"",
      offset:1

    }
    this.loadMoreAgencies = this.loadMoreAgencies.bind(this);
     this.offset = 1;
    this.defaultRelativeUrl ='/api/tour/getAll/1'+this.offset;
    this.abortController = new AbortController();
  this.agenciesResponse=null;
  }


  async  getTourAgenciesFromApi() {
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
      this.agenciesResponse = responseJson;
      this.setState({isLoading:false});
      this.setState({tourAgencies:responseJson.tour_companies});
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
  async  getMoreAgenciesFromApi() {
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
      this.agenciesResponse = responseJson;
      this.setState({isLoadingMore:false});
      if(responseJson.tour_companies.length  > 0)
      {
        this.setState({tourAgencies:this.state.tourAgencies.concat(responseJson.tour_companies)});
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
 
    if(this.state.connection_Status == "Online")
    {
      
    this.getTourAgenciesFromApi().done();
    
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
        this.getTourAgenciesFromApi().done();
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
  loadMoreAgencies()
  {
    this.setState({offset:this.state.offset++});

    this.state.relativeUrl ='/api/tour/getAll/'+this.state.offset;

    this.setState({isLoadingMore:true});
    this.getTourAgenciesFromApi().done();
  }
  renderLoadMore()
  {
    if(this.state.isLoadingMore)
    {
  return( <Spinner color='#F05742' style={{flex: 1}}/>);
    }
    if(this.agenciesResponse != null)
    {
    if(this.agenciesResponse.total_tours > 20 && !this.state.isLoadingMore && this.state.tourAgencies.length < this.agenciesResponse.total_tours)
    {
  return(
  <Button transparent style={{flexDirection:"row",alignSelf:"center"}} onPress={this.loadMoreAgencies}>
  <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>See more</Text>
</Button>);
    }
  }
  }
 

 
  render() {
    if(this.state.connection_Status == "Online")
    {
    if(this.state.isLoading){
      return(
        
        <SkeletonLoader headerText="Loading agencies..."/>
        
      )
    }
    if(this.state.isException){
      return(
        
        <Exception />
        
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
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Tour & Travel</Title>
          </Body>
          <Right />
        </Header>
        <Content>
         
               {
    this.state.tourAgencies.map((agency, key) => ( 
    <TouchableHighlight 
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onPress={()=>this.props.navigation.navigate('TourAgencyDetail',{tourAgency:agency})}  key={key}> 
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
            <CardItem >
            <Left style={{flex:0.6}}>
           <Thumbnail square source={{uri:this.state.baseUrl+agency.logo}} style={{width:'100%',height:80,position:'relative',top:-9}}  />        
            </Left>
              <Body style={styles.hotelListTextContainer}>
              <Text style={styles.headerText}>
              {agency.company_name}
            </Text>
            <Text numberOfLines={2} note>
                 {agency.address}
            </Text>                            

            
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

export default withNavigation(TourAgencyList);
