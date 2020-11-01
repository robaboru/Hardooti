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
import Exception from "../../common/Exception";
import CustomMenuIcon from "../../common/SideMenuPopUp/CustomMenuIcon ";
import SkeletonLoader from "../../common/SkeletonLoader";
const supriya =  require("../../../../assets/skylightH.jpg");

class HotelRoomList extends Component 
{
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isException:false,
      rooms:[],
      hotel:null,
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/room/hotel/',
      currency:null
    }
     this.abortController = new AbortController();
  }
  
  async  getHotelRoomsFromApi() {
    try 
    {
      const { navigation } = this.props;
      this.abortController = new AbortController();
      var hotel  = navigation.getParam('hotel', null);
      this.setState({hotel:hotel});
      let response = await fetch(
        this.state.baseUrl+this.state.relativeUrl+hotel.id,
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
        this.setState({isException:true});
      }
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
    }
  });
 this.getHotelRoomsFromApi().done();
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
  renderPrice(price,priceUSD)
  {
    if(price != "" && price != null)
    {
      if(this.state.currency == "ETB")
      {
      return( <Body style={{flexDirection:"row",alignSelf:"flex-end",backgroundColor:"#F05742",padding:15,paddingLeft:5,paddingRight:5}}>
      <Text style={{fontWeight:'bold',fontFamily: 'Cochin',color:'white'}}>
        {"ETB "+price}
      </Text>          
      </Body>);
      }
      else
      {
        return( <Body style={{flexDirection:"row",alignSelf:"flex-end",backgroundColor:"#F05742",padding:15,paddingLeft:5,paddingRight:5}}>
        <Text style={{fontWeight:'bold',fontFamily: 'Cochin',color:'white'}}>
          {"USD "+priceUSD}
        </Text>          
        </Body>);
      }
    }
  }
  renderRoomList(room,key)
  {
    let roomDetail ={'room':room,'hotel':this.state.hotel};
    return(
<TouchableHighlight 
activeOpacity={0.6}
underlayColor="#DDDDDD"
onPress={()=>this.props.navigation.navigate('HotelRoomDetail',{roomDetail:roomDetail})} key={key}> 
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
            <CardItem>
            <Left style={{flex:0.5}}>
           <Thumbnail square source={{uri:this.state.baseUrl+room.photo}} style={{width:80,height:70}}  />        
            </Left>
              <Body style={styles.hotelListTextContainer}>
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
    );
  }
    render() {



      if(this.state.isLoading)
      {
        return(
          <SkeletonLoader headerText="Loading Rooms..."/>
          
        )
      }
      if(this.state.isException){
        return(
          
          <Exception />
          
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
           <Text style={{padding:10}}>Unable to find room for this hotel.</Text>
        </Container>
          );
      }
        return (
            <Container style={{backgroundColor:"#f3f8ff"}}>
                <Header style={{backgroundColor:"white",}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                          <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Available Rooms</Title>
          </Body>
          <Right >
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
        {
    this.state.rooms.map((room, key) => (
      
       this.renderRoomList(room,key)
       ))
      }
      <Content />
       <Footer >
  <FooterTab style={{backgroundColor:"white"}}>
    <Button active={false} >
    </Button>
    <Button transparent onPress={()=>this.makeCall(this.state.hotel.phone)} style={{borderLeftWidth:1,borderColor:'#ddd'}}>
          <Body style={{flexDirection:'row'}}>
            
            <Text style={{flexDirection:'row',alignSelf:'flex-end',fontSize:20,fontWeight:'600',position:'relative',top:-7}}>Reserve
            </Text>
              <Icon name="phone" style={{color:"green"}} size={30}/>
            
          </Body>
    </Button>

  </FooterTab>
</Footer>
          </Container>
        );
    }
}
export default withNavigation(HotelRoomList);