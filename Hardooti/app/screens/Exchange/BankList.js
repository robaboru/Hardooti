import React, { Component } from "react";
import { ActivityIndicator,TouchableHighlight,Alert,Linking,Keyboard,Image  } from 'react-native';
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
  Grid,
  Row,
  Col,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body, 
  Right,
} from "native-base";
import styles from "./styles";
import { withNavigation } from 'react-navigation';
import HttpService from "../../services/HttpService";
import ProgressLoader from "../common/ProgressLoader";
import Exception from "../common/Exception";
const supriya =  require("../../../assets/skylight.jpg");
const logo = require("../../../assets/logo.png");


class BankList extends Component {
  
  constructor(props)
  {
    super(props);
    this.state =
    { 
      isLoading: true,
      isException:false,
      banks:[],
      connection_Status : "",
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/bank_list/1'
    }
    this.abortController = new AbortController();
  }

  async  getBanksFromApi() {
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
      this.setState({isLoading:false});
      this.setState({banks:responseJson.bank_list});
     
      return responseJson;
    } catch (error) 
    {
      if (error.name != 'AbortError') 
      {
        this.setState({isException:true});
      }
    }
  }
  
  componentWillUnmount() 
  {
    if(this.state.isLoading)
    {
      this.abortController.abort(); 
    }      
  }
  componentDidMount()
  {
    
    if(this.state.connection_Status == "Online")
    {
    this.getBanksFromApi().done();
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
        this.getBanksFromApi().done();
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
 
 
  render() {
    if(this.state.connection_Status == "Online")
    {
    if(this.state.isLoading)
    {
      return(
        <ProgressLoader headerText="Loading..."/>
      );
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
            <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Choose Bank</Title>
          </Body>
          <Right />
        </Header>
        <Content>     

      
               {
    this.state.banks.map((bank, key) => (

           <TouchableHighlight onPress={()=>this.props.navigation.navigate('ExchangeList',{bankInfo:bank})} key={key}> 
           <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
             <CardItem>
             <Left style={{flex:0.9}}>
            <Thumbnail square source={{uri:this.state.baseUrl+bank.logo}} style={{width:'100%',height:80,position:'relative',top:-9}}  />        
             </Left>
               <Body style={styles.hotelListTextContainer}>
               <Text style={styles.headerText}>
               {bank.name}
             </Text>        
               </Body>                                  
             </CardItem>                          
           </Card>
           </TouchableHighlight>                                    
            ))
           }
      
          
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

export default withNavigation(BankList);