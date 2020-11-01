import React, { Component } from "react";
import { Image,BackHandler,ActivityIndicator,TouchableHighlight,Alert} from 'react-native';
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
class RestaurantDrinkMenuList extends Component 
{
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      drinks:[],
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/drink/restaurant/',
      restaurant:null
    }
    this.abortController = new AbortController();
  }
  
  componentWillUnmount() 
  {
    if(this.state.isLoading)
    {
      this.abortController.abort(); 
    }   
  }
  async  getRestaurantDrinkMenu() {
    try 
    {
      this.abortController = new AbortController();
      const { navigation } = this.props;
      var restaurant  = navigation.getParam('restaurant', null);
      this.setState({restaurant:restaurant});
      let response = await fetch(
        this.state.baseUrl+this.state.relativeUrl+restaurant.id,
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
  componentDidMount()
  {
 this.getRestaurantDrinkMenu().done();
  }

    render() {



      if(this.state.isLoading)
      {
        return(
          <ProgressLoader headerText="Loading..."/>
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
          <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Drinks</Title>
          </Body>
          <Right />
        </Header>
           <Text style={{padding:10}}>Unable to find drinks for this restaurant.</Text>
           <Content padder />
<Footer >
  <FooterTab style={{backgroundColor:"white"}}>
    <Button active={false} onPress={() => this.props.navigation.navigate('RestaurantMealMenu',{restaurant:this.state.restaurant})}>
      <Icon active={false} name="restaurant" size={20} style={{color:"gray"}}/>
      <Text style={{color:"gray",textTransform:"capitalize"}}>Dishes</Text>
    </Button>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}}>
      <Icon active={true} name="local-bar" size={20} style={{color:"#F05742"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Drinks</Text>
    </Button>  
    <Button active={false} onPress={() => this.props.navigation.navigate('RestaurantLocation',{restaurant:this.state.restaurant})}>
      <Icon active={false} name="location-on" size={20} style={{color:"gray"}}/>
      <Text style={{color:"gray",textTransform:"capitalize"}}>Location</Text>
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
          <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Drinks</Title>
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
            <Body style={{flexDirection:"row",alignSelf:"flex-end",backgroundColor:"#F05742",padding:15,paddingLeft:5,paddingRight:5}}>
            <Text style={{fontSize:16,color:"white",fontFamily: 'Cochin'}}>
             {drink.price_etb} ETB
            </Text>          
            </Body>
              </Body>                               
            </CardItem>                            
          </Card>
         
       ))
      }
      <Content padder />

<Footer >
  <FooterTab style={{backgroundColor:"white"}}>
    <Button active={false} onPress={() => this.props.navigation.navigate('RestaurantMealMenuList',{restaurant:this.state.restaurant})}>
      <Icon active={false} name="restaurant" size={20} style={{color:"gray"}}/>
      <Text style={{color:"gray",textTransform:"capitalize"}}>Dishes</Text>
    </Button>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}}>
      <Icon active={true} name="local-bar" size={20} style={{color:"#F05742"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Drinks</Text>
    </Button>
    <Button active={false} onPress={() => this.props.navigation.navigate('RestaurantLocation',{restaurant:this.state.restaurant})}>
      <Icon active={false} name="location-on" size={20} style={{color:"gray"}}/>
      <Text style={{color:"gray",textTransform:"capitalize"}}>Location</Text>
    </Button>
  </FooterTab>
</Footer>
          </Container>
        );
    }
}
export default withNavigation(RestaurantDrinkMenuList);