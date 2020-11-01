import React, { Component } from "react";
import { Image } from "react-native";
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
  Right
} from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from "./styles";
import HttpService from "../../services/HttpService";
class TourAgencyDetail extends Component {
  
  constructor(props){
    super(props);
    this.state ={ 
      baseUrl:HttpService.baseUrl
    }
  }

  render() {
    const { navigation } = this.props;
    var tourAgency  = navigation.getParam('tourAgency', null);

    return (
              
       <Container>
          <Header style={{backgroundColor:"white",}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                          <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Detail</Title>
          </Body>
          <Right />
        </Header>
      
      <Content >
          <Card style={styles.mb}>
            <CardItem>
              <Left>              
                <Body>
    <Text style={{fontSize:18}}>{tourAgency.company_name}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem cardBody style={{flex:1,width:"100%",backgroundColor:"#646464"}}>
              <Image
                style={{
                  resizeMode: "cover",
                  width: '100%',
                  height: 200,
                  flex: 1
                }}
                source={{uri:this.state.baseUrl+tourAgency.logo}}
              />
            </CardItem>           
          </Card>
     
          <Grid>
            <Row style={styles.row}>
              
              <Col style={styles.col}  onPress={()=>this.props.navigation.navigate('TourAgencyService',{tourAgency:tourAgency})} >
                <Icon name="star" style={{ color: "#F05742" }} size={25}/>
                <Text numberOfLines={1} style={styles.iconText}>
                  Services
                </Text>
              </Col>
             
              <Col style={styles.col} onPress={()=>this.props.navigation.navigate('TourAgencyInformation',{tourAgency:tourAgency})}>
                <Icon name="info" style={{ color: "#F05742" }} size={25}/>
                <Text numberOfLines={1} style={styles.iconText}>
                  Information
                </Text>
              </Col>
           
            </Row>
            </Grid>
            </Content>
     {/* <Footer >
            <FooterTab style={{backgroundColor:"white"}}>
              <Button active={true}>
                <Icon active={true} name="apps" />
                <Text>Apps</Text>
              </Button>
              <Button onPress={()=>this.props.navigation.navigate('HotelRoomList',{hotel:hotel})}>
                <Icon name="key" />
                <Text>Rooms</Text>
              </Button>
              <Button onPress={()=>this.props.navigation.navigate('HotelMealMenu',{hotel:hotel})}>
                <Icon name="pizza" />
                <Text>Menu</Text>
              </Button>
              <Button  >
                <Icon  name="beer" />
                <Text>Service</Text>
              </Button>
            </FooterTab>
          </Footer> */}
      </Container>
      
       
    );
  }
}

export default withNavigation(TourAgencyDetail);
