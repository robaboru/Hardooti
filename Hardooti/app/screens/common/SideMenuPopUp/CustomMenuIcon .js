//This is an example code for the popup menu//
import React, { Component } from 'react';
//import react in our code.
import { View, Text,Image, TouchableOpacity  } from 'react-native';
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import menu and menu item
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class CustomMenuIcon extends Component {
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  option1Click = () => {
    this._menu.hide();
    this.props.option1Click();
  };
 
  renderCurrencyMenuItem()
  {
      if(this.props.currency == 'ETB')
      {
          return(
            <MenuItem onPress={this.option1Click}>
            <Text style={{fontSize:16}}>Currecy(USD)</Text>
                  </MenuItem>
          );
      }
      else{
        return(
            <MenuItem onPress={this.option1Click}>
            <Text style={{fontSize:16}}>Currecy(ETB)</Text>
                  </MenuItem>
          );
      }
  }
  render() {
    return (
      <View style={this.props.menustyle}>
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu} >
           <Icon name="dots-vertical"  style={{color:"#F05742",padding:12,paddingRight:15}} size={30}/>  
            </TouchableOpacity>
          }>
         {this.renderCurrencyMenuItem()}
          <MenuDivider />

        </Menu>
      </View>
    );
  }
}