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
  Body
} from "native-base";
import { Linking,TouchableHighlight,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
class ContactUs extends Component {
    
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
                  {text: 'Ok', onPress: () => this.props.navigation.navigate("ContactUs")},
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
          <TouchableHighlight onPress={()=>this.makeCall(phone)}>
            <CardItem style={{marginTop:10,borderBottomWidth:1,borderColor:'#ddd'}}>
              <Left>
                <Icon
                  active
                  name="phone"
                  style={{ color: "green" }}
                  size={25}
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
            <TouchableHighlight onPress={()=>this.redirectToLink(link)} >
            <CardItem style={{marginTop:10,borderBottomWidth:1,borderColor:'#ddd'}}>
            <Left>
                <Icon
                  active
                  name={iconName}
                  style={{ color: "#3B579D" }}
                  size={25}
                />
               <Text>{link}</Text>
              </Left>
            </CardItem>
            </TouchableHighlight>           
        );
        }
      }
     

  render() {

    return (
      <Container style={{backgroundColor:'#f3f8ff'}}>
       <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-left" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Contact Us</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card style={{marginBottom: 15,width:"100%",}} >
          {this.showPhone("+251933703749")}
          {this.showPhone("+251922088220")}
          {this.showLink("https://gohospitality.net","web")}           
          {this.showLink("https://www.facebook.com/Go-Hospitality-1500544476844423","facebook")}
          {this.showLink("https://t.me/gohospitality","telegram")}
          </Card>
          
        </Content>
      </Container>
    );
  }
}

export default withNavigation(ContactUs);

