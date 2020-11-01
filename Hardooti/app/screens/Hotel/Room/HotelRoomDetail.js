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
const supriya =  require("../../../../assets/skylightH.jpg");
class HotelRoomDetail extends Component 
{
  constructor(props){
    super(props);
    this.state ={ 
      baseUrl:HttpService.baseUrl
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
  
  renderRoomService(name,description,key)
  {
   if(name != "" && name != null)
   {
     return(<CardItem key={key}>
      <Left style={{flex:0.1}}>
        <Icon
          active
          name="check-circle"
          style={{ color: "green" }}
          size={20}
        />
        </Left>
        <Body style={{flexDirection:"column",position:"relative",top:10}}>
         <Text>{name}</Text>
         <Text note>{description}</Text>
        </Body>                           
    </CardItem>);
   }
  }
  renderCancellationPolicy(cancellationPolicy)
  {
  if(cancellationPolicy != null && cancellationPolicy !="")
  {
  return(<Content>
    <Text style={{alignSelf:"flex-start",flexDirection:"row",marginTop:20,marginLeft:20}}>Cancellation Policy :</Text>
      <Text note style={{alignSelf:"flex-start",flexDirection:"row",marginLeft:20}}>{cancellationPolicy}</Text>
      </Content>);
  }
  }
    render() {
      const { navigation } = this.props;
       var roomInfo  = navigation.getParam('roomDetail', null);
        return (
            <Container>
          <Header style={{backgroundColor:"white",}} androidStatusBarColor="#F05742">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                          <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Room Detail</Title>
          </Body>
          <Right >
          <Button transparent onPress={()=>this.makeCall(roomInfo.hotel.phone)} style={{flexDirection:'row',alignSelf:'flex-end'}}>
          <Text style={{color:'#000',textTransform:'capitalize',fontSize:16,
           }}>Reserve<Icon name="phone" style={{color:"green"}} size={20}/></Text>
          </Button>
          </Right>
        </Header>

        <Content>
          <Card style={styles.mb}>
            <CardItem>
              <Left>              
                <Body>
         <Text style={{fontSize:18,fontWeight:'bold'}}>{roomInfo.room.name}</Text>
         <Text note>{roomInfo.room.number_of_bed+" "+roomInfo.room.bed_name}</Text>
         <Text note>{roomInfo.room.payment_status}</Text>


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
                source={{uri:this.state.baseUrl+roomInfo.room.photo}}
              />
              
            </CardItem>  

            <Text style={{alignSelf:"center",flexDirection:"row",marginTop:10}}>Room Facilities</Text>                             
              {              
        roomInfo.room.services.map((service, key) => (
            this.renderRoomService(service.name,service.description ,key)
             ))
         }
            
              {this.renderCancellationPolicy(roomInfo.room.cancellati)}
          </Card>   
            </Content>
          </Container>
        );
    }
}
export default withNavigation(HotelRoomDetail);