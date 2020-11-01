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
const supriya =  require("../../../../assets/skylightH.jpg");
class CafeMealMenuList extends Component 
{
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isException:false,
      meals:[],
      baseUrl:HttpService.baseUrl,
      relativeUrl:'/api/food/cafe/',
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
  async  getCafeMealMenu() {
    try 
    {
      this.abortController = new AbortController();
      const { navigation } = this.props;
      var cafe  = navigation.getParam('cafe', null);
      this.setState({cafe:cafe});
      let response = await fetch(
        this.state.baseUrl+this.state.relativeUrl+cafe.id,
        {
          method: 'GET',
          signal: this.abortController.signal,
        }
      );
      let responseJson = await response.json();
      this.setState({isLoading:false});
      this.setState({meals:responseJson.foods});
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
 this.getCafeMealMenu().done();
  }
  renderPrice(price)
  {
      if(price != null && price != "")
      {
          return(
     
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
          <ProgressLoader headerText="Loading..."/>
        )
      }
      if(this.state.isException)
      {
          return(
            <Exception />
          );
      }
      if(this.state.meals.length < 1)
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
          <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}> Dishes</Title>
          </Body>
          <Right />
        </Header>
           <Text style={{padding:10}}>Unable to find dining for this cafe.</Text>
           <Content padder />
      <Footer >
  <FooterTab style={{backgroundColor:"white"}}>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}}>
      <Icon active={true} name="restaurant" size={20} style={{color:"#F05742"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Dishes</Text>
    </Button>
    <Button active={false}  onPress={() => this.props.navigation.navigate('CafeDrinkMenuList',{cafe:this.state.cafe})}>
      <Icon active={false} name="free-breakfast" style={{color:"gray"}} size={20}/>
      <Text style={{color:"gray",textTransform:"capitalize"}}>Drinks</Text>
    </Button>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}} onPress={() => this.props.navigation.navigate('CafeContactInformation',{cafe:this.state.cafe})}>
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
          <Title style={{color:"#000",fontSize:18,alignSelf:"center",fontFamily: 'Cochin'}}>Dishes</Title>
          </Body>
          <Right />
        </Header>
        {
    this.state.meals.map((food, key) => (
       
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",borderColor:"white"}}  key={key} >             
            <CardItem style={{borderWidth:0}}>
            <Left style={{flex:0.5}}>
           <Thumbnail square source={{uri:this.state.baseUrl+food.photo}} style={{width:'100%',height:80}}  />        
            </Left>
              <Body style={styles.hotelListTextContainer}>
              <Text style={styles.headerText}>
             {food.name}
            </Text>
            <Text numberOfLines={1} note style={styles.headerText}>
            Type : {food.type}
            </Text> 
            <Text numberOfLines={1} note style={styles.headerText}>
             {food.description}
            </Text>   
            {/* {this.renderPrice(food.price_etb)} */}
              </Body>                               
            </CardItem>                            
          </Card>
         
       ))
      }
       <Content padder />
      <Footer >
  <FooterTab style={{backgroundColor:"white"}}>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}}>
      <Icon active={true} name="restaurant" size={20} style={{color:"#F05742"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Dishes</Text>
    </Button>
    <Button active={false}  onPress={() => this.props.navigation.navigate('CafeDrinkMenuList',{cafe:this.state.cafe})}>
      <Icon active={false} name="free-breakfast" style={{color:"gray"}} size={20}/>
      <Text style={{color:"gray",textTransform:"capitalize"}}>Drinks</Text>
    </Button>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}} onPress={() => this.props.navigation.navigate('CafeContactInformation',{cafe:this.state.cafe})}>
      <Icon active={true} name="info" size={20} style={{color:"gray"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Information</Text>
    </Button>
  </FooterTab>
</Footer>
          </Container>
        );
    }
}
export default withNavigation(CafeMealMenuList);