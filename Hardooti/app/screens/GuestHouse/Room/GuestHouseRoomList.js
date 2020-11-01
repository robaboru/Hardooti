import React, { Component } from "react";
import { Image,ActivityIndicator,TouchableHighlight,Alert,Linking,AsyncStorage} from 'react-native';
import {
  Footer,
  FooterTab,
  Button,
  Text,
  Header,
  Title,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Container,
  Content,
  Spinner
} from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../styles";
import { withNavigation } from 'react-navigation';
import HttpService from "../../../services/HttpService";
import ProgressLoader from "../../common/ProgressLoader";
import CustomMenuIcon from "../../common/SideMenuPopUp/CustomMenuIcon ";
import SkeletonLoader from "../../common/SkeletonLoader";
const supriya =  require("../../../../assets/skylightH.jpg");

class GuestHouseRoomList extends Component 
{
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      rooms:[],
      guestHouseInfo:null,
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/room/guest_house/',
      currency:'ETB'
    }
     this.abortController = new AbortController();
  }
  
  async  getGuestHouseRoomsFromApi() {
    try 
    {
      const { navigation } = this.props;
      this.abortController = new AbortController();
      var guestHouse  = navigation.getParam('guestHouse', null);
      this.setState({guestHouseInfo:guestHouse});
      let response = await fetch(
        this.state.baseUrl+this.state.relativeUrl+guestHouse.id,
        {
          method: 'GET',
          signal: this.abortController.signal,
      }
      );
      let responseJson = await response.json();
      this.setState({isLoading:false});
      this.setState({rooms:responseJson.rooms});
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
  componentWillUnmount() 
  {
    // Cancel request
    if(this.state.isLoading)
    {
     
      this.abortController.abort(); 
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
 this.getGuestHouseRoomsFromApi().done();
  }
  makeCall = (number) => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${'+number+'}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };
  renderPrice(price,priceUSD)
  {
    if(price != "" && price != null && priceUSD != "" && priceUSD != null)
    {
      if(this.state.currency == "ETB")
      {
      return(<Body style={{flexDirection:"row",alignSelf:"flex-end",backgroundColor:"#F05742",padding:15,paddingLeft:5,paddingRight:5}}>
      <Text style={{fontWeight:'bold',fontFamily: 'Cochin',color:'white'}}>
        {"ETB "+price}
      </Text>          
      </Body>);
      }
      else
      {
        return(<Body style={{flexDirection:"row",alignSelf:"flex-end",backgroundColor:"#F05742",padding:15,paddingLeft:5,paddingRight:5}}>
        <Text style={{fontWeight:'bold',fontFamily: 'Cochin',color:'white'}}>
          {"USD "+priceUSD}
        </Text>          
        </Body>);
      }
    }
  }
  renderRoomList(room,key)
  {
    let roomDetail ={'room':room,'guestHouse':this.state.guestHouseInfo};
    return(
      <TouchableHighlight
      activeOpacity={0.6}
    underlayColor="#DDDDDD"
       onPress={()=>this.props.navigation.navigate('GuestHouseRoomDetail',{roomDetail:roomDetail})} key={key}> 
      <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
        <CardItem>
        <Left style={{flex:0.5}}>
       <Thumbnail square source={{uri:this.state.baseUrl+room.photo}} style={{width:80,height:70}}  />        
        </Left>
          <Body style={styles.ListTextContainer}>
          <Text style={styles.headerText}>
        {room.name}
        </Text>
        <Text numberOfLines={1} note>
           {room.number_of_bed+" "+room.bed_name}
        </Text>   
        <Text numberOfLines={1} note>
           {room.payment_status}
        </Text> 
        {this.renderPrice(room.price_etb,room.price_usd)}             
      
          </Body>                               
        </CardItem>                            
      </Card>
      </TouchableHighlight> 
    )
  }
    render() {

      const { navigation } = this.props;
      var guestHouse  = navigation.getParam('guestHouse', null);
      
      if(this.state.isLoading)
      {
        return(
          <SkeletonLoader headerText="Loading Rooms..."/>
          
        )
      }
      if(this.state.rooms.length < 1)
      {
        return (
        <Container>
           <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                          <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
          <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Available Rooms</Title>
          </Body>
          <Right />
        </Header>
           <Text style={{padding:10}}>Unable to find room for this guest house.</Text>
           <Content padder/>
           <Footer >
          <FooterTab style={{backgroundColor:"white"}}>
            <Button active={false}>
              <Icon active={false} name="vpn-key" size={20} style={{color:"#F05742"}}/>
              <Text style={{color:"gray",textTransform:"capitalize"}}>Rooms</Text>
            </Button>
            <Button active={true} style={{backgroundColor:"white",color:"#000"}} onPress={() => this.props.navigation.navigate('GuestHouseLocation',{guestHouse:guestHouse})}>
              <Icon active={true} name="location-on" size={20} style={{color:"gray"}}/>
              <Text style={{color:"#000",textTransform:"capitalize"}}>Location</Text>
            </Button>
            <Button active={true} style={{backgroundColor:"white",color:"#000"}} onPress={() => this.props.navigation.navigate('GuestHouseContactInformation',{guestHouse:guestHouse})}>
              <Icon active={true} name="info" size={20} style={{color:"gray"}}/>
              <Text style={{color:"#000",textTransform:"capitalize"}}>Information</Text>
            </Button>
          </FooterTab>
          </Footer>
        </Container>
          );
      }
        return (
            <Container style={{backgroundColor:"#f3f8ff"}}>
                <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                          <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Available Rooms</Title>
          </Body>
          <Right >
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
          {/* <Button transparent onPress={() => this.makeCall(this.state.guestHouseInfo.phone)} style={{flexDirection:'row',alignSelf:'flex-end'}}>
          <Text style={{color:'#F05742',textTransform:'capitalize',fontSize:16,
           }}>Reserve<Icon name="phone" style={{color:"green"}} size={20}/></Text>
          </Button> */}
          </Right>
        </Header>
        {
    this.state.rooms.map((room, key) => (
      this.renderRoomList(room,key)
       ))
      }
          <Content padder/>
           <Footer >
          <FooterTab style={{backgroundColor:"white"}}>
            <Button active={false}>
              <Icon active={false} name="vpn-key" size={20} style={{color:"#F05742"}}/>
              <Text style={{color:"gray",textTransform:"capitalize"}}>Rooms</Text>
            </Button>
            <Button active={true} style={{backgroundColor:"white",color:"#000"}} onPress={() => this.props.navigation.navigate('GuestHouseLocation',{guestHouse:guestHouse})}>
              <Icon active={true} name="location-on" size={20} style={{color:"gray"}}/>
              <Text style={{color:"#000",textTransform:"capitalize"}}>Location</Text>
            </Button>
            <Button active={true} style={{backgroundColor:"white",color:"#000"}} onPress={() => this.props.navigation.navigate('GuestHouseContactInformation',{guestHouse:guestHouse})}>
              <Icon active={true} name="info" size={20} style={{color:"gray"}}/>
              <Text style={{color:"#000",textTransform:"capitalize"}}>Info</Text>
            </Button>
            <Button active={true} style={{backgroundColor:"white",color:"#000"}} onPress={() => this.makeCall(this.state.guestHouseInfo.phone)}>
              <Icon active={true} name="phone" size={20} style={{color:"green"}}/>
              <Text style={{color:"#000",textTransform:"capitalize"}}>Reserve</Text>
            </Button>
          </FooterTab>
          </Footer>
          </Container>
        );
    }
}
export default withNavigation(GuestHouseRoomList);