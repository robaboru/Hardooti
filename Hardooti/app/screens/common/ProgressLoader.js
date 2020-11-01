import React,{Component} from 'react';
import { ActivityIndicator,TouchableHighlight,Alert,Linking,Keyboard,Image, View,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Item,        
  Input,
  Right,
  Spinner
  
} from "native-base";
import { withNavigation } from 'react-navigation';
import Shimmer from './Shimmer';
const defaultImage = require("../../../assets/logo.png");

class ProgressLoader extends React.Component
{
  constructor(props){
    super(props);
    this.state ={ 
      lists:["","","",""]
      
    }
   
  }
render()
{
    return(
        <Container style={{backgroundColor:'#fff'}}>
           <Header style={{backgroundColor:"#fff",elevation:0}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
                           <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
    <Title style={{color:"#000",fontSize:16,alignSelf:'flex-end',fontFamily: 'Cochin'}}></Title>
          </Body>
          <Right />
        </Header>       
            <Content style={{flex: 1,paddingTop:100}}>   
          <Spinner color='#F05742' />
          {/* <Text style={{alignSelf:'center'}}>Loading...</Text> */}
                    {/* {
    this.state.lists.map((list, key) => ( 
          <View style={styles.imageContent} key={key}>
          <Shimmer autoRun={true} visible={false}  style={styles.imagew} opacity={1}>
            <Image source={defaultImage} style={styles.imagew}/>
        </Shimmer>
        <View style={styles.movieContent}>
                                <Shimmer autoRun={true} visible={false}>
                                    <Text>Hotel</Text>
                                </Shimmer>
                                <Shimmer autoRun={true} visible={false}>
                                    <Text>Hotel Address</Text>
                                </Shimmer>
                            </View>
                            </View>))
                    }
                    <Spinner color='#ccc' /> */}
          </Content>
        </Container>
      );
}

}
const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  imageContent: {
      flexDirection: 'row',
      margin: 16
  },
  movieContent: {
      margin: 8,
      justifyContent: 'space-between',
      flexDirection: 'column'
  },
  imagew: {
      width: 80,
      height: 80
  },
  mcontent: {
      marginTop: 8,
      marginBottom: 8
  }
})
export default withNavigation(ProgressLoader);
