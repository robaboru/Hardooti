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
class GuiderList extends Component {
  
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isLoadingMore:false,
      isException:false,
      tourGuiders:[],
      connection_Status : "",
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/tour_guider/',
      offset:1,
    }
    this.tourGuidersResponse=null;
    this.loadMoreTourGuiders = this.loadMoreTourGuiders.bind(this);
    this.abortController = new AbortController();

 
  }


  async  getTourGuidersFromApi() {
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

      this.tourGuidersResponse = responseJson;

      await this.setState({isLoading:false});
      await this.setState({tourGuiders:responseJson.tour_guider});
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
  async  getMoreTourGuidersFromApi() {
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
      this.tourGuidersResponse = responseJson;
      await this.setState({isLoadingMore:false});
      if(responseJson.tour_guider.length  > 0)
      {
       await this.setState({tourGuiders:this.state.tourGuiders.concat(responseJson.tour_guider)});
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
    if(this.state.connection_Status == "Online")
    {
    this.getTourGuidersFromApi().done();
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
        this.getTourGuidersFromApi().done();
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
  loadMoreTourGuiders()
  {
    this.setState({offset:this.state.offset++});
    this.state.relativeUrl = '/api/tour_guider/'+this.state.offset;
    this.setState({isLoadingMore:true});
    this.getMoreTourGuidersFromApi().done();
  }
  renderLoadMore()
  {
    if(this.state.isLoadingMore)
    {
  return( <Spinner color='#F05742' style={{flex: 1}}/>);
    }
    if(this.tourGuidersResponse.total_guider > 20 && !this.state.isLoadingMore && this.state.tourGuiders.length < this.tourGuidersResponse.total_guider)
    {
  return(
  <Button transparent style={{flexDirection:"row",alignSelf:"center"}} onPress={this.loadMoreTourGuiders}>
  <Text style={{textTransform:'capitalize',color:"gray",fontFamily: 'Cochin'}}>See more</Text>
</Button>);
    }
  }
  
  render() {
    if(this.state.connection_Status == "Online")
    {
    if(this.state.isLoading){
      return(
        <SkeletonLoader headerText=""/>
      )
    }
    if(this.state.isException){
      return(
        
        <Exception />
        
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
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Tour Guiders</Title>
          </Body>
          <Right />
        </Header>
        <Content>
       
          
               {
    this.state.tourGuiders.map((l, key) => (
   
    <TouchableHighlight 
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onPress={()=>this.props.navigation.navigate('GuiderDetail',{guiderInfo:l})} key={key}> 
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white",padding:0}}   >             
            <CardItem>
            <Left style={{flex:0.5}}>
           <Thumbnail square source={{uri:this.state.baseUrl+l.logo}} style={{width:'100%',height:100}}  />        
            </Left>
              <Body style={styles.ListTextContainer}>
              <Text style={styles.headerText}>
              {l.name}
            </Text>
            
            <Text numberOfLines={1} note>
                Gender : {l.gender}
            </Text>   
            <Text numberOfLines={1} note>
                Age : {l.age}
            </Text>  
            <Text numberOfLines={1} note>
               
            </Text>   
            <Text numberOfLines={1} > 
            View detail...
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

export default withNavigation(GuiderList);