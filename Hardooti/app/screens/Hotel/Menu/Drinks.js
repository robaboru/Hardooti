import React, { Component } from "react";
import { Image,ActivityIndicator,TouchableHighlight,Alert} from 'react-native';
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
class DrinkMenuList extends Component 
{
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isException:false,
      drinks:[],
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/drink/hotel/',
      hotel:null
    }
    this.abortController = new AbortController();
  }
  
  async  getHotelDrinkMenu() {
    try 
    {
      this.abortController = new AbortController();

      const { navigation } = this.props;
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
      this.setState({drinks:responseJson.drinks});
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
  componentDidMount()
  {
 this.getHotelDrinkMenu().done();
  }
  componentWillUnmount() 
  {
    if(this.state.isLoading)
    {
      this.abortController.abort(); 
    }   
  }

  

    render() {



      if(this.state.isLoading)
      {
        return(
          <ProgressLoader headerText="Loading Drinks..."/>

        )
      }
      if(this.state.isException){
        return(
          
          <Exception />
          
        )
      }
      if(this.state.drinks.length < 1)
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
          <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Available Drinks</Title>
          </Body>
          <Right />
        </Header>
           <Text style={{padding:10}}>Unable to find drinks for this hotel.</Text>
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
          <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Available Drinks</Title>
          </Body>
          <Right />
        </Header>
        {
    this.state.drinks.map((drink, key) => (
       
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",borderColor:"white"}}  key={key} >             
            <CardItem style={{borderWidth:0}}>
            <Left style={{flex:0.5}}>
           <Thumbnail square source={{uri:this.state.baseUrl+drink.photo}} style={{width:'100%',height:80}}  />        
            </Left>
              <Body style={styles.hotelListTextContainer}>
              <Text style={styles.headerText}>
             {drink.name}
            </Text>
            <Text numberOfLines={1} note>
            Type : {drink.type}
            </Text> 
            <Text numberOfLines={1} note>
             {drink.description}
            </Text>   
            {/* <Body style={{flexDirection:"row",alignSelf:"flex-end",backgroundColor:"#F05742",padding:15,paddingLeft:5,paddingRight:5}}>
            <Text style={{fontSize:16,color:"white",fontFamily: 'Cochin'}}>
             {drink.price_etb} ETB
            </Text>          
            </Body> */}
              </Body>                               
            </CardItem>                            
          </Card>
         
       ))
      }
      <Content padder />

<Footer >
  <FooterTab style={{backgroundColor:"white"}}>
    <Button active={false} onPress={() => this.props.navigation.navigate('HotelMealMenu',{hotel:this.state.hotel})}>
      <Icon active={false} name="restaurant" size={20} style={{color:"gray"}}/>
      <Text style={{color:"gray",textTransform:"capitalize"}}>Dishes</Text>
    </Button>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}}>
      <Icon active={true} name="local-bar" size={20} style={{color:"#F05742"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Drinks</Text>
    </Button>
   
  </FooterTab>
</Footer>
          </Container>
        );
    }
}
export default withNavigation(DrinkMenuList);