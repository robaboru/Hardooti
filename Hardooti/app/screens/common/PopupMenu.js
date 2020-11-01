import React,{Component} from 'react';
import { ActivityIndicator,TouchableHighlight,Alert,Linking,Keyboard  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Text,
  Left,
  Body,
  Item,        
  Input,
  Right
} from "native-base";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { withNavigation } from 'react-navigation';
class PopupMenu extends React.Component
{
render()
{
    // const { navigation } = this.props;
    // var message  = navigation.getParam('message', null);
    return(
        <Container style={{backgroundColor:'#f3f8ff'}}>
               
     <Content>
     <Menu>
      <MenuTrigger text='Select action' />
      <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)} text='Save' />
        <MenuOption onSelect={() => alert(`Delete`)} >
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
      </MenuOptions>
    </Menu>
     </Content>
        </Container>
      );
}

}
export default withNavigation(PopupMenu);
