import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Fab,
  Text,
  Button,
  IconNB,
  Left,
  Right,
  Body,
  View
} from "native-base";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class Restraunt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }


  render() {
    return (
      <Container style={styles.container}>
       <Header style={{backgroundColor:"white"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:18,alignSelf:"center"}}>Restraunts</Title>
          </Body>
          <Right />
        </Header>

        <View style={{ flex: 1 }}>
          <View>
            <Text>Restraunt list</Text>
          </View>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#fff",borderWidth:1,borderColor:"#ddd" }}
            position="bottomRight"
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="my-location" style={{color:"#00a160"}}/>
           
          </Fab>
        </View>
      </Container>
    );
  }
}













// import React, { Component } from 'react';
// import { Button, View, Text } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// export default class Restraunt extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>About Screen</Text>
//       </View>
//     )
//   }
// }
