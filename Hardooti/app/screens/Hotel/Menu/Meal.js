import React, { Component } from "react";
import { Image,ActivityIndicator,TouchableHighlight,Alert} from 'react-native';
import {
  Footer,
  FooterTab,
  Button,
  Text,
  Header,
  Title,
  Tabs,
  Tab,
  TabHeading,
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
const supriya =  require("../../../../assets/skylightH.jpg");
import { MenuProvider } from 'react-native-popup-menu';
import PopupMenu from "../../common/PopupMenu";
import Dinner from "./Dinner";
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
const abortController = new AbortController();
class MealMenuList extends Component
{
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      isException:false,
      breakfasts:[],
      lunchs:[],
      dinners:[],
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/food/hotel/',
      hotel:null
    }
    this.abortController = new AbortController();
  }
  renderBreakFastTab()
  {
   if(this.state.breakfasts.length > 0)
   {
     return(
     
      <Tab
      heading={
        <TabHeading style={{backgroundColor: '#F05742'}}>
          <Text>Breakfast</Text>
        </TabHeading>
      }
    >
       <Breakfast meals={ this.state.breakfasts}/>
    </Tab>
     );
   }
  }
  renderLunchTab()
  {
    if(this.state.lunchs.length > 0)
    {
      return(
      
       <Tab
       heading={
         <TabHeading style={{backgroundColor: '#F05742'}}>

           <Text>Lunch</Text>
         </TabHeading>
       }
     >
        <Breakfast meals={ this.state.lunchs}/>
     </Tab>
      );
    }
  }
  renderDinnerTab()
  {
    if(this.state.dinners.length > 0)
    {
      return(
      
       <Tab
       heading={
         <TabHeading style={{backgroundColor: '#F05742'}}>

           <Text>Dinner</Text>
         </TabHeading>
       }
     >
        <Breakfast meals={ this.state.dinners}/>
     </Tab>
      );
    }
  }
  async  getHotelMealMenu() {
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
      this.setState({breakfast:responseJson.breakfasts});
      this.setState({lunchs:responseJson.lunchs});
      this.setState({dinners:responseJson.dinners});
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
 this.getHotelMealMenu().done();
  }
  componentWillUnmount()
  {
    if(this.state.isLoading)
    {
      this.abortController.abort();
    }
  }
  renderPrice(price)
  {
    if(price != null && price != "")
    {
      return
      (
        <Body style={{flexDirection:"row",alignSelf:"flex-end",backgroundColor:"#F05742",padding:15,paddingLeft:5,paddingRight:5}}>
        <Text style={{fontSize:16,color:"white",fontFamily: 'Cochin'}}>
         {price} ETB
        </Text>
        </Body>
      );
    }
  }
    render() {



      if(this.state.isLoading)
      {
        return(
          <ProgressLoader headerText="Loading Meals..."/>

        )
      }
      if(this.state.isException){
        return(

          <Exception />

        )
      }
      if(this.state.lunchs.length < 1 && this.state.breakfasts.length < 1 && this.state.dinners.length < 1)
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
          <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Available Dishes</Title>
          </Body>
          <Right />
        </Header>
           <Text style={{padding:10}}>Sorry,unable to find dishes for this hotel.</Text>
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
          <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Available Dishes</Title>
          </Body>
          <Right />
        </Header>
        <Tabs style={{ elevation: 3 }}>
          {this.renderBreakFastTab()}
          {this.renderLunchTab()}
          {this.renderDinnerTab()}
        </Tabs>

      <Footer >
  <FooterTab style={{backgroundColor:"white"}}>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}}>
      <Icon active={true} name="restaurant" size={20} style={{color:"#F05742"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Dishes</Text>
    </Button>
    <Button active={false}  onPress={() => this.props.navigation.navigate('HotelDrinkMenu',{hotel:this.state.hotel})}>
      <Icon active={false} name="local-bar" style={{color:"gray"}} size={20}/>
      <Text style={{color:"gray",textTransform:"capitalize"}}>Drinks</Text>
    </Button>

  </FooterTab>
</Footer>
          </Container>
        );
    }
}
export default withNavigation(MealMenuList);