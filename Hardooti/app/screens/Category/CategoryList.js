import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Footer,
  FooterTab,
  Left,
  Right,
  Col,
  Grid,
  Row,
  Body,
  Fab
} from "native-base";
import { TouchableHighlight, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
   
  render() {
    return (
      <Container style={styles.container} > 
        <Header style={{backgroundColor:"#fff"}} androidStatusBarColor="#F05742">
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
          >
              <Icon name="menu" size={30} style={{color:"#F05742"}}/>
            </Button>
          </Left>
          <Body>
           <Title style={{color:"#000",fontSize:20,alignSelf:'flex-end',fontFamily: 'Cochin'}}></Title>
          </Body>
          <Right/>
        </Header>
     <Content padder style={{paddingTop:5}}>
       <View style={{flex:1,flexDirection:"column"}}>
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
           style={styles.col} onPress={()=>this.props.navigation.navigate('Hotel')}>
          <View >
         <Icon name="local-hotel" style={{ color: "white",alignSelf:"center",borderRadius:50,padding:8,color:"#F05742",backgroundColor:"#fff",elevation:1 }} size={30} />
                <Text numberOfLines={1} style={styles.iconText}>
                  Hotel
                </Text>
         </View>
          </TouchableHighlight>
        
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
           style={styles.col} onPress={()=>this.props.navigation.navigate('RestaurantList')}>
          <View >
          <Icon name="restaurant" style={{ color: "white",alignSelf:"center",borderRadius:50,padding:8,color:"#F05742",backgroundColor:"#fff",elevation:1 }} size={30}/>
                <Text numberOfLines={1} style={styles.iconText}>
                  Restaurant
                </Text>
         </View>
          </TouchableHighlight>
        </View>
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
           style={styles.col} onPress={()=>this.props.navigation.navigate('GuestHouseList')}>
          <View >
          <Icon name="vpn-key" style={{ color: "white",alignSelf:"center",borderRadius:50,padding:8,color:"#F05742",backgroundColor:"#fff",elevation:1 }} size={30}/>
                <Text numberOfLines={2} style={styles.iconText}>
                Guest House
                </Text>  
         </View>
          </TouchableHighlight>
        
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
           style={styles.col} onPress={()=>this.props.navigation.navigate('EventList')}>
          <View >
          <Icon name="local-movies" style={{ color: "white",alignSelf:"center",borderRadius:50,padding:8,color:"#F05742",backgroundColor:"#fff",elevation:1 }} size={30}/>
                <Text numberOfLines={1} style={styles.iconText}>
                Event
                </Text>
         </View>
          </TouchableHighlight>
        </View>
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
           style={styles.col} onPress={()=>this.props.navigation.navigate('TourAgencyList')}>
          <View >
          <Icon name="local-see" style={{ color: "white",alignSelf:"center",borderRadius:50,padding:8,color:"#F05742",backgroundColor:"#fff",elevation:1 }} size={30}/>
                <Text numberOfLines={2} style={styles.iconText}>
                Tour & Travel
                </Text>
         </View>
          </TouchableHighlight>
        
          <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
           style={styles.col} onPress={()=>this.props.navigation.navigate('TourGuiderList')}>
          <View >
          <Icon name="people" style={{ color: "white",alignSelf:"center",borderRadius:50,padding:8,color:"#F05742",backgroundColor:"#fff",elevation:1 }} size={30}/>
                <Text numberOfLines={2} style={styles.iconText}>
                Tour Guides
                </Text>
         </View>
          </TouchableHighlight>
        </View>
        
       </View>
       
            </Content>
            
        

  <Footer >
  <FooterTab style={{backgroundColor:"white"}}>
    <Button >
      
    </Button>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}} onPress={()=>this.props.navigation.navigate('NearestPreference')}>
      <Icon active={true} name="my-location" size={20} style={{color:"gray"}}/>
      <Text style={{color:"#000",textTransform:'capitalize'}}>Find nearest</Text>
    </Button>
   
  </FooterTab>
</Footer>
      </Container>
    );
  }
}

export default CategoryList;
