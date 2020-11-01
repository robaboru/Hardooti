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
import styles from "./styles";

class HotelContactInformation extends Component {
    
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
                  {text: 'Ok', onPress: () => this.props.navigation.navigate("HotelContactInformation")},
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
     

  render() {
    const { navigation } = this.props;
    var hotel  = navigation.getParam('hotel', null);

    return (
      <Container style={styles.container}>
       <Header style={{backgroundColor:"white",}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-left" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Information</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card style={styles.mb} >
          {this.showPhone(hotel.phone)}
          {this.showLink(hotel.website,"web")}           
          {this.showLink(hotel.facebook,"facebook")}
           
            <CardItem >
              <Text style={{textAlign:"center",flex:1,fontSize:20}}>About</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                {hotel.about+"."}
                </Text>
              </Body>
            </CardItem>
          </Card>
          
        </Content>
      </Container>
    );
  }
}

export default withNavigation(HotelContactInformation);

