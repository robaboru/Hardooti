import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Body,
  Spinner,
  Item,
  Input
} from "native-base";
import { Linking,TouchableHighlight,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import styles from "../styles";
import HttpService from "../../../services/HttpService";
class CafeSearchByCity extends Component {
    constructor(props){
        super(props);
        this.state ={ 
          cityList:[],
          searchTerm:"",
          baseUrl:HttpService.baseUrl,
          relativeUrl:'/api/cityList/cafe',
          isLoading:true,
          cityListForSearch:[]
        }
        this.cityList= [];
        this.abortController = new AbortController();
      }
      componentDidMount()
      {
          this.getCityListFromApi().done();
      }
      componentWillUnmount() 
      {
        // Cancel request   
        if(this.state.isLoading)
        {
          this.abortController.abort(); 
        } 
      }
      async  getCityListFromApi() {
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
          this.setState({cityList:responseJson.cities});
         
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
      onCitySubmit()
      {      
       if(this.state.searchTerm != "")
       {
       this.props.navigation.navigate('CafeListByCity',{city:this.state.searchTerm});  
       }
      }
      onCitySelected(cityName)
      {
       this.setState({searchTerm:cityName});
       this.props.navigation.navigate('CafeListByCity',{city:cityName});
      }
      searchCity(searchTerm)
      {
      this.setState({searchTerm:searchTerm});
       this.cityList =[];
       for(let cityIndex=0;cityIndex<this.state.cityList.length;cityIndex++)
       {
         let cityName = this.state.cityList[cityIndex].city_name;
          
         if (cityName.startsWith(searchTerm)) {
        
            this.cityList.push(this.state.cityList[cityIndex]);
           
          } 
       }
      this.setState({cityListForSearch:this.cityList});
      
      }
      cityListRender(cityList)
      {
    return( <Card style={styles.mb}>
        {
      cityList.map((city, key) => (            
        <TouchableHighlight key={key} onPress={()=>this.onCitySelected(city.city_name)}>
          <CardItem >
            <Left>
              <Icon
                active
                name="location-on"
                style={{ color: "gray" }}
                size={20}
              />
         <Text>{city.city_name}</Text>
            </Left>       
          </CardItem>
  </TouchableHighlight> ))
 }
        </Card>);
      }
  render() {
    if(this.state.isLoading){
        return(
          <Container >
             <Header style={{backgroundColor:"#fff"}} androidStatusBarColor="#F05742">
            <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                              <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
              </Button>
            </Left>
            <Body>
              <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Loading cities...</Title>
            </Body>
            <Right />
          </Header>       
                
            <Spinner color='#F05742' style={{flex: 1}}/>
          </Container>
        )
      }
    if(this.state.cityListForSearch.length > 0)
    {
        return (
            <Container style={styles.container}>
             <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
                <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                                  <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
                  </Button>
                </Left>
                <Body>
                  <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Search</Title>
                </Body>
                <Right />
              </Header>
              <Item style={{backgroundColor:"white",borderWidth:1}}>          
                   
                   <Input placeholder="Search City" 
                   onSubmitEditing={()=>this.onCitySubmit()}
                   onChangeText={searchTerm => this.searchCity(searchTerm)}
                   />   
                   <Button transparent onPress={()=>this.onCitySubmit()}>
                   <Icon active name="search" style={{color:"#F05742"}} size={25} />  
                 </Button>              
                 </Item> 
              <Content>
        {this.cityListRender(this.state.cityListForSearch)}
        </Content>
        </Container>);
    }
    return (
      <Container style={styles.container}>
       <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Search</Title>
          </Body>
          <Right />
        </Header>
        <Item style={{backgroundColor:"white",borderWidth:1}}>          
             
             <Input placeholder="Search City" 
             onSubmitEditing={()=>this.searchCity()}
             onChangeText={searchTerm => this.searchCity(searchTerm)}
             />   
             <Button transparent onPress={()=>this.searchCity()}>
             <Icon active name="search" style={{color:"#F05742"}} size={25} />  
           </Button>              
           </Item> 
        <Content>
          <Card style={styles.mb}>
          {
        this.state.cityList.map((city, key) => (            
          <TouchableHighlight key={key} onPress={()=>this.onCitySelected(city.city_name)}>
            <CardItem >
              <Left>
                <Icon
                  active
                  name="location-on"
                  style={{ color: "gray" }}
                  size={20}
                />
           <Text>{city.city_name}</Text>
              </Left>       
            </CardItem>
    </TouchableHighlight> ))
   }
          </Card>
          
        </Content>
      </Container>
    );
  }
}

export default withNavigation(CafeSearchByCity);

