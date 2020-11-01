import React, { Component } from "react";
import { Image,ActivityIndicator,TouchableHighlight,Alert} from 'react-native';
import {
  Text,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Container,

} from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../styles";
import { withNavigation } from 'react-navigation';
import HttpService from "../../../services/HttpService";

class BreakFast extends Component 
{
  constructor(props){
    super(props);
    this.state ={ 

        baseUrl:HttpService.baseUrl,

      }
  }


    render() {
      
        return (
            <Container style={{backgroundColor:"#f3f8ff"}}>
 
        {
    this.props.meals.map((food, key) => (
       
          <Card style={{width:'98%',marginLeft:'1%',backgroundColor:"#fff",elevation:1,borderColor:"white"}}  key={key} >             
            <CardItem style={{borderWidth:0}}>
            <Left style={{flex:0.5}}>
           <Thumbnail square source={{uri:this.state.baseUrl+food.photo}} style={{width:'100%',height:80}}  />        
            </Left>
              <Body style={styles.ListTextContainer}>
              <Text style={styles.menuHeaderText}>
             {food.name}
            </Text>
            <Text numberOfLines={1} note style={{paddingLeft:20}}>
            {food.type}
            </Text> 
            <Text numberOfLines={2} note style={{paddingLeft:20}}>
             {food.description}
            </Text>   
        
            {/* {this.renderPrice(food.price_etb)} */}
              </Body>                               
            </CardItem>                            
          </Card>
         
       ))
      }
    
          </Container>
        );
    }
}
export default withNavigation(BreakFast);