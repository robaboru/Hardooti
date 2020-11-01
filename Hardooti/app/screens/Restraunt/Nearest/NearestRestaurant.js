import React, { Component } from "react";
import { ActivityIndicator,TouchableHighlight,Alert,Linking,Keyboard  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Item,        
  Input,
  Right,
  Spinner,
  Footer,
  FooterTab
} from "native-base";
import styles from "../styles";
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { withNavigation } from 'react-navigation';
import HttpService from "../../../services/HttpService";
import ProgressLoader from "../../common/ProgressLoader";
import SkeletonLoader from "../../common/SkeletonLoader";
class NearestRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location:null,
      isLoading:true,
      restaurants:[],
      baseUrl:HttpService.baseUrl,
      relativeUrl:""
    };
    this.abortController = new AbortController();
  }
  async  getNearestRestaurantsFromApi() {
    try 
    {
        this.abortController = new AbortController();
      let response = await fetch(
        this.state.baseUrl+this.state.relativeUrl,
        {
            method: 'GET',
            signal:  this.abortController.signal,
        }
      );
      let responseJson = await response.json();
      this.setState({isLoading:false});
      this.setState({restaurants:responseJson.restaurants});
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
  componentWillUnmount() 
  {
    if(this.state.isLoading)
    {
        this.abortController.abort(); 
    }       
  }
  componentDidMount()
  {
    const { navigation } = this.props;
    var coordinates  = navigation.getParam('coordinates', null);
    this.state.relativeUrl="/api/nearest_restaurant/"+coordinates.lat+"/"+coordinates.long;
    this.getNearestRestaurantsFromApi().done();
  }

   showDistance(distance)
   {
 if(distance > 0)
 {
 return(<Text style={{flexDirection:"row",alignSelf:"flex-end"}}>{distance+" Km"}</Text>);
 }
   }
  renderNearestRestaurants()
  {
      if(this.state.restaurants.length > 0)
      {
      return(
        <Content>                    
     {
    this.state.restaurants.map((restaurant, key) => (
   
    <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
     onPress={()=>this.props.navigation.navigate('RestaurantMealMenu',{restaurant:restaurant})} key={key}> 
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
            <CardItem>
            <Left style={{flex:0.7}}>
           <Thumbnail square source={{uri:this.state.baseUrl+restaurant.photo}} style={{width:'100%',height:80}}  />        
            </Left>
              <Body style={styles.ListTextContainer}>
              <Text style={styles.headerText}>
              {restaurant.name}
            </Text>
            <Text numberOfLines={2} note>
                 {restaurant.address}
            </Text> 
                    
            <Body style={{alignSelf:"flex-start"}}>
           
            {this.showDistance(restaurant.distance_km)}           
            </Body>
          <Right/>
              </Body>                                  
            </CardItem>          
                   
          </Card>
          </TouchableHighlight> 
                  ))
           }
   
 </Content> 
      );
  }
  else
  {
    <Content>
      <Text style={{padding:10}}>Couldn't find nearest restaurant.</Text>  
    </Content>
  }
  }
  renderFooter()
{
  if(this.state.restaurants.length > 0)
  {
    return(<Footer >
      <FooterTab style={{backgroundColor:"white"}}>
        <Button></Button>
        <Button active={false} onPress={() => this.props.navigation.navigate('NearestRestaurantMap',{restaurants:this.state.restaurants})}>
          <Icon active={false} name="map" size={20} style={{color:"gray"}}/>
          <Text style={{color:"#000",textTransform:"capitalize",fontSize:16}}>View in map</Text>
        </Button>  
      </FooterTab>
    </Footer>);
  }
}
  render() {
   
    if(this.state.isLoading)
    {
        return(
          <SkeletonLoader headerText="Loading Restaurants..."/>

        )
      }
    
    return (
        <Container style={styles.container}>
        <Header style={{backgroundColor:"#fff"}} androidStatusBarColor="#F05742">
           <Left>
           <Button transparent onPress={()=>this.props.navigation.goBack()}>
                             <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
             </Button>
           </Left>
           <Body>
             <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}> Restaurants</Title>
           </Body>
           <Right />
         </Header>
           {this.renderNearestRestaurants()}
         {this.renderFooter()}
       </Container>
    );
    }
  
}

export default NearestRestaurant;
