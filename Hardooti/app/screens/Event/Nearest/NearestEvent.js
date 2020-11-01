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
  Spinner
} from "native-base";
import styles from "../styles";
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { withNavigation } from 'react-navigation';
import HttpService from "../../../services/HttpService";
import ProgressLoader from "../../common/ProgressLoader";
import Exception from "../../common/Exception";
import SkeletonLoader from "../../common/SkeletonLoader";
class NearestEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location:null,
      isLoading:true,
      isException:false,
      events:[],
      baseUrl:HttpService.baseUrl,
      relativeUrl:""
    };
    this.abortController = new AbortController();
  }
  async  getNearestEventsFromApi() {
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
      this.setState({events:responseJson.events});
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
    if(this.state.isLoading)
    {
        this.abortController.abort(); 
    }       
  }
  componentDidMount()
  {
    const { navigation } = this.props;
    var coordinates  = navigation.getParam('coordinates', null);
    this.state.relativeUrl="/api/nearest_event/"+coordinates.lat+"/"+coordinates.long;
    this.getNearestEventsFromApi().done();
  }

   showDistance(distance)
   {
 if(distance > 0)
 {
 return(<Text style={{flexDirection:"row",alignSelf:"flex-end"}}>{distance+" Km"}</Text>);
 }
   }
   renderNearestEvents()
  {
      if(this.state.events.length > 0)
      {
      return(
        <Content>                    
     {
    this.state.events.map((event, key) => (
   
    <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
     onPress={()=>this.props.navigation.navigate('EventInformation',{event:event})} key={key}> 
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}   >             
            <CardItem>
            <Left style={{flex:0.7}}>
           <Thumbnail square source={{uri:this.state.baseUrl+event.photo}} style={{width:'100%',height:80}}  />        
            </Left>
              <Body style={styles.ListTextContainer}>
              <Text style={styles.headerText}>
              {event.name}
            </Text>
            <Text numberOfLines={2} note>
                 {event.venue}
            </Text> 
              
                    
            <Body style={{alignSelf:"flex-start"}}>
           
            {this.showDistance(event.distance_km)}           
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
      <Text style={{padding:10}}>Couldn't find nearest event.</Text>  
    </Content>
  }
  }
  
  render() {
   
    if(this.state.isLoading)
    {
        return(
          <SkeletonLoader headerText="Loading Events..."/>

        )
      }
      if(this.state.isException)
      {
          return(
            <Exception/>
  
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
             <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}> Event</Title>
           </Body>
           <Right />
         </Header>
           {this.renderNearestEvents()}
       </Container>
    );
    }
  
}

export default NearestEvent;
