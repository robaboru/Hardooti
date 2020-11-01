import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Footer,
  FooterTab,
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import styles from "./styles";

class RestaurantInformation extends Component {
    
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
          <TouchableHighlight onPress={()=>this.makeCall(phone)}>
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
    var restaurant  = navigation.getParam('restaurant', null);

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
          {this.showPhone(restaurant.phone)}
          {this.showLink(restaurant.website,"web")}           
          {this.showLink(restaurant.facebook,"web")}
           
            <CardItem >
              <Text style={{textAlign:"center",flex:1,fontSize:20}}>About</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                {restaurant.about+"."}
                </Text>
              </Body>
            </CardItem>
          </Card>
          
        </Content>
       
        <Footer >
  <FooterTab style={{backgroundColor:"white"}}>  
    <Button active={true} style={{backgroundColor:"white",color:"#000"}} >
      <Icon active={true} name="info" size={20} style={{color:"#F05742"}}/>
      <Text style={{color:"#000",textTransform:"capitalize"}}>Information</Text>
    </Button>
    <Button active={false} onPress={() => this.props.navigation.navigate('RestaurantLocation',{restaurant:restaurant})}>
      <Icon active={false} name="restaurant" size={20} style={{color:"gray"}}/>
      <Text style={{color:"gray",textTransform:"capitalize"}}>Location</Text>
    </Button>
  </FooterTab>
</Footer>
      </Container>
    );
  }
}

export default withNavigation(RestaurantInformation);

