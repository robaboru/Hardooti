import React,{Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { withNavigation } from 'react-navigation';


class BackButton extends React.Component
{
  constructor(props){
    super(props);
  
   
  }
render()
{
    return(<Icon name="arrow-left" style={{color:"#F05742"}} size={20}/>);
}

}

export default withNavigation(BackButton);
