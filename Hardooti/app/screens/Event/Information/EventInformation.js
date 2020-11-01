import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Footer,
  FooterTab,
  Content,
  Button,
  Thumbnail,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Body
} from "native-base";
import { Linking,TouchableHighlight,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import styles from "../styles";
import HttpService from "../../../services/HttpService";

class EventInformation extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      baseUrl:HttpService.baseUrl,

    }

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

      redirectToLink = (url) =>
      {
        Linking.openURL(url).catch((err) => 
        {
            Alert.alert(
                'Unable to load please try again...',
                null,
                [               
                  {text: 'Ok', onPress: () => this.props.navigation.navigate("GuestHouseContactInformation")},
                ],
                {cancelable: false},
              );
        });
      }
    showPhone(phone)
    {
      if(phone != "")
      {
        return (
          <TouchableHighlight
          activeOpacity={0.6}
    underlayColor="#DDDDDD"
           onPress={()=>this.makeCall(phone)}>
            <CardItem>
              <Left>
                <Icon
                  active
                  name="phone"
                  style={{ color: "green" }}
                  size={20}
                />
                <Text>{phone}</Text>
              </Left>       
            </CardItem>
            </TouchableHighlight>          
      );
      }
    }
   
      showLink(link,iconName)
      {
        if(link != "" && link != null)
        {
          return (
            <TouchableHighlight
            activeOpacity={0.6}
    underlayColor="#DDDDDD"
             onPress={()=>this.redirectToLink(link)}>
            <CardItem>
            <Left>
                <Icon
                  active
                  name={iconName}
                  style={{ color: "#3B579D" }}
                  size={20}
                />
               <Text>{link}</Text>
              </Left>
            </CardItem>
            </TouchableHighlight>           
        );
        }
      }
    
    showEntrance(entrance)
    {
      if(entrance != "" && entrance != null)
      {
        return (
         
          <CardItem>
          <Left>
              <Text>Entrance : </Text>
             <Text style={{fontWeight:'700',fontSize:20}}>{entrance +" ETB"}</Text>
            </Left>
          </CardItem>
       
      );
      }
    }
    showVenue(venue)
    {
      if(venue != "" && venue != null)
      {
        return (
         
          <CardItem >
          <Left>
              <Text>Venue : </Text>
             <Text>{venue}</Text>
            </Left>
          </CardItem>
       
      );
      }
    }
    showStartDate(date)
    {
      if(date != "" && date != null)
      {
        return (
         
          <CardItem>
          <Left>
          
          <Icon
                  active
                  name='date-range'
                  style={{ color: "#F05742" }}
                  size={20}
                />
             
             <Text>Starting Date : {date}</Text>
            </Left>
          </CardItem>
       
      );
      }
    }
    showEndDate(date)
    {
      if(date != "" && date != null)
      {
        return (
         
          <CardItem>
          <Left>
          
          <Icon
                  active
                  name='date-range'
                  style={{ color: "#F05742" }}
                  size={20}
                />
             
             <Text>End Date: {date}</Text>
            </Left>
          </CardItem>
       
      );
      }
    }
  render() {
    const { navigation } = this.props;
    var event  = navigation.getParam('event', null);

    return (
      <Container style={styles.container}>
       <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Information</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card style={styles.mb} >
          <CardItem>
        <Text style={{fontSize:25,fontWeight:'600',textTransform:'capitalize'}}>{event.name}</Text>   
        </CardItem>
        <Thumbnail square source={{uri:this.state.baseUrl+event.photo}} style={{width:'100%',height:200,position:'relative',top:-9}}  />        

          {this.showVenue(event.venue)}
          {this.showStartDate(event.kikoff)}      
          {this.showEndDate(event.kikend)}    
          {this.showEntrance(event.fee_etb)}                      
         <Text style={{padding:15,paddingTop:10}}>{event.proposed_exhibitor}</Text>
         {this.showPhone(event.phone)}
          {this.showLink(event.website,"web")}           
          {this.showLink(event.facebook,"web")} 
          </Card>         
        </Content>      
    <Footer >
  <FooterTab style={{backgroundColor:"white"}}>  
    <Button active={true} style={{backgroundColor:"white",color:"#000"}} >
      <Icon active={true} name="info" size={20} style={{color:"#F05742"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Information</Text>
    </Button>
    <Button active={false} onPress={() => this.props.navigation.navigate('EventLocation',{event:event})}>
      <Icon active={false} name="location-on" size={20} style={{color:"gray"}}/>
      <Text style={{color:"gray",textTransform:"capitalize"}}>Location</Text>
    </Button>
  </FooterTab>
  </Footer>
      </Container>
    );
  }
}

export default withNavigation(EventInformation);

