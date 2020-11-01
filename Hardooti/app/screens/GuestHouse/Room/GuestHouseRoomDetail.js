import React, { Component } from "react";
import { Image,ActivityIndicator,TouchableHighlight,Linking} from 'react-native';
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
  Grid,
  Col,
  Row,
  Container,
  Content,
} from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../styles";
import { withNavigation } from 'react-navigation';
import HttpService from "../../../services/HttpService";
class GuestHouseRoomDetail extends Component 
{
  constructor(props){
    super(props);
    this.state ={ 
      baseUrl:HttpService.baseUrl
    }
    
  }
  componentDidMount()
  {
    const { navigation } = this.props;
    var roomDetail  = navigation.getParam('roomDetail', null);
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
  renderRoomFacilties(service,key)
  {
   if(service.name != "" && service.description !="")
   {
return(
<CardItem key={key}>
  <Left style={{flex:0.1}}>
    <Icon
      active
      name="check-circle"
      style={{ color: "green" }}
      size={20}
    />
    </Left>
    <Body style={{flexDirection:"column",position:"relative",top:10}}>
     <Text>{service.name}</Text>
     <Text note>{service.description}</Text>
    </Body>                           
</CardItem>
)
   }
  }
  renderCancellationPolicy(cancellation_policy)
  {
    if(cancellation_policy != "")
    {
      return(
      <Body  style={{alignSelf:"flex-start",flexDirection:"column",marginTop:20,marginLeft:20,flex:1}}>
      <Text style={{flexDirection:"column",marginLeft:10,flex:1}}>Cancellation Policy :</Text>
        <Text note style={{flexDirection:"column",marginLeft:0,flex:1}}>{cancellation_policy}</Text>
   </Body>
   );
    }
  }
    render() {
      
       const { navigation } = this.props;
    var roomDetail  = navigation.getParam('roomDetail', null);
    var guestHouse =roomDetail.guestHouse;
        return (
            <Container>
          <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                          <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Room Detail</Title>
          </Body>
          <Right >
          <Button transparent onPress={() => this.makeCall(guestHouse.phone)} style={{flexDirection:'row',alignSelf:'flex-end'}}>
          <Text style={{color:'#F05742',textTransform:'capitalize',fontSize:16,
           }}>Reserve<Icon name="phone" style={{color:"green"}} size={20}/></Text>
          </Button>
          </Right>
        </Header>

        <Content>
          <Card style={styles.mb}>
            <CardItem>
              <Left>              
                <Body>
         <Text style={{fontSize:18,fontWeight:'bold'}}>{roomDetail.room.name}</Text>
         <Text note>{roomDetail.room.number_of_bed+" "+roomDetail.room.bed_name}</Text>
         <Text note>{roomDetail.room.payment_status}</Text>


                </Body>
              </Left>
            </CardItem>

            <CardItem cardBody>
              <Image
                style={{
                  resizeMode: "cover",
                  width: '100%',
                  height: 200,
                  flex: 1
                }}
                source={{uri:this.state.baseUrl+roomDetail.room.photo}}
              />
              
            </CardItem>  

            <Text style={{alignSelf:"center",flexDirection:"row",marginTop:10}}>Room Facilities</Text>                             
              {              
        roomDetail.room.services.map((service, key) => (
            this.renderRoomFacilties(service,key)
             ))
         }
         {this.renderCancellationPolicy(roomDetail.room.cancellation_policy)}
          </Card>   
            </Content>
          </Container>
        );
    }
}
export default withNavigation(GuestHouseRoomDetail);