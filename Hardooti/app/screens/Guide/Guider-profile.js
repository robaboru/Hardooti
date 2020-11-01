import React, { Component } from "react";
import { Image,Linking,TouchableHighlight,Alert } from "react-native";
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Header,
  Card,
  Title,
  CardItem,
  Text,
  Content,
  Grid,
  Row,
  Col,
  Left,
  Body,
  Right, View
} from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from "./styles";
import HttpService from "../../services/HttpService";
class GuiderProfile extends Component {
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
              {text: 'Ok', onPress: () => this.props.navigation.goBack()},
            ],
            {cancelable: false},
          );
    });
  }
  renderFacebook(facebookUrl)
  {
    if(facebookUrl != null && facebookUrl !="")
    {
    return(
     <Icon name="facebook" style={{color:"#3b5998",flex:0.5}} size={30} onPress={()=>this.redirectToLink(facebookUrl)}/>
   );
    }
  }
  renderTelegram(telegramUrl)
  {
    if(telegramUrl != null && telegramUrl !="")
    {
    return(  
    <Icon name="telegram" style={{color:"#0088cc",flex:0.5}} size={30} onPress={()=>this.redirectToLink(telegramUrl)}/>
   );
    }
  }
  renderEmail(emailAddress)
  {
    if(emailAddress != null && emailAddress !="")
    {
    return(  <CardItem>
      <Icon name="email" style={{color:"#F05742"}} size={25} />

        <Text>
         Email :{emailAddress}
        </Text>               
      </CardItem>
     );
    }
  }
  renderWebsite(webAddress)
  {
    if(webAddress != null && webAddress !="")
    {
    return(  <Icon name="web" style={{color:"#F05742",flex:0.5}} size={30} onPress={()=>this.redirectToLink(webAddress)}/>);
    }
  }
  renderPhone(phoneNumber)
  {
    if(phoneNumber != null && phoneNumber !="")
    {
    return(<Icon name="phone" style={{color:"green",flex:0.5}} size={30} onPress={()=>this.makeCall(phoneNumber)}/>);
    }
  }
  render() {
    const { navigation } = this.props;
    var guiderInfo  = navigation.getParam('guiderInfo', null);
    return (
              
       <Container>
          <Header style={{backgroundColor:"white",}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                          <Icon name="arrow-left" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Guider Profile</Title>
          </Body>
          <Right />
        </Header>
      
      <Content >
       
             <Content>
             <Image
                style={{
                  resizeMode: "cover",
                  width: 120,
                  height: 120,
                  flex: 0.5,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop:25,
                  borderRadius: 400/ 2
                }}
                source={{uri:this.state.baseUrl+guiderInfo.logo}}
              />
              <Text style={styles.guiderProfileName}>
                {guiderInfo.name}
              </Text>
             </Content>
            <Container>
              
             <Card style={{width:"94%",marginLeft:"3%",padding:5,marginTop:20}}>
             <CardItem style={{alignSelf:"center"}}>
               {this.renderWebsite(guiderInfo.website)}
               {this.renderFacebook(guiderInfo.facebook)}
               {this.renderTelegram(guiderInfo.telegram)}

               {this.renderPhone(guiderInfo.phone)}
  
               </CardItem>
               <CardItem>
                 <Text>
                   Gender :   {guiderInfo.gender}
                 </Text>               
               </CardItem>
               <CardItem>
                 <Text>
                   Age :  {guiderInfo.age}
                 </Text>               
               </CardItem>
               <CardItem>
                 <Text>
                 Specialized :  {guiderInfo.especialized}
                 </Text>               
               </CardItem>
               <CardItem>
                 <Text>
                 Experience : {guiderInfo.expirance}
                 </Text>               
               </CardItem>
               <CardItem>
               <Icon name="voice" style={{color:"#F05742"}} size={25}/>

                 <Text>
                  Language : {guiderInfo.language}
                 </Text>               
               </CardItem>
               {this.renderEmail(guiderInfo.email)}
               
             </Card>
            </Container>
      
          
            </Content>
   
      </Container>
      
       
    );
  }
}

export default withNavigation(GuiderProfile);
