import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Grid,
  Row,
  Col,
  Button,
  Thumbnail,
  Footer,
  FooterTab,
  Text,
  Left,
  Right,
  Body
} from "native-base";
import { Linking,TouchableHighlight,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import styles from "./styles";
import HttpService from "../../services/HttpService";

class ExchangeList extends Component {
      
  constructor(props)
  {
    super(props);
    this.state =
    { 
      bank: null,   
      baseUrl:HttpService.baseUrl  
    }
    
  }
  componentDidMount()
  {
    const { navigation } = this.props;
    var bankInfo  = navigation.getParam('bankInfo', null);
    this.setState({bank:bankInfo});    
  }
  showHeader()
  {
    if(this.state.bank.currencies.length > 0)
    {
      return( 
      <Row >                           
        <Col style={styles.currencyListCol} >
          
            <Text numberOfLines={1} style={styles.currencyHeaderText}>
              Currency 
            </Text>
          </Col>                                     
          <Col style={styles.currencyListCol} >
          
          <Text numberOfLines={1} style={styles.currencyHeaderText}>
              Buyed
           </Text>
        </Col> 
        <Col style={styles.currencyListCol} >
          
          <Text numberOfLines={1} style={styles.currencyHeaderText}>
           Sold
          </Text>
        </Col> 
           </Row>
           );
    }
  }
  renderDate()
 {
 if(this.state.bank.currencies.length > 0)
 {
   return( 
   <Body style={{alignSelf:'flex-end',paddingRight:10}}>   
      <Text style={{fontWeight:'700'}}><Icon name="date-range" style={{color:"green"}} size={24}/>{this.state.bank.currencies[0].date}</Text>
    </Body>);

 }

 }

  render() {
  if(this.state.bank != null){
    return (
      <Container style={styles.container}>
       <Header style={{backgroundColor:"white"}} androidStatusBarColor="#F05742">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" style={{color:"#F05742"}} size={25}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000",fontSize:16,alignSelf:"center",fontFamily: 'Cochin'}}>Exchange Rate</Title>
          </Body>
         <Right />
        </Header>

        <Content padderm style={{backgroundColor:'#fff'}}>
        <Thumbnail square source={{uri:this.state.baseUrl+this.state.bank.logo}} style={{width:'100%',height:130,position:'relative'}}  />        

            <Grid style={{backgroundColor:'#f3f8ff'}}>

    <Text style={{fontSize:20,fontWeight:'700',padding:10}}>{this.state.bank.name}</Text>
    {this.renderDate()}
        <Row >                           
        <Col style={styles.currencyListCol} >
          
            <Text numberOfLines={1} style={styles.currencyHeaderText}>
              Currency 
            </Text>
          </Col>                                     
          <Col style={styles.currencyListCol} >
          
          <Text numberOfLines={1} style={styles.currencyHeaderText}>
              Buying
           </Text>
        </Col> 
        <Col style={styles.currencyListCol} >
          
          <Text numberOfLines={1} style={styles.currencyHeaderText}>
           Selling
          </Text>
        </Col> 
           </Row>
           {
             this.state.bank.currencies.map((currency, key) => (
           <Row key={key}>                           
        <Col style={styles.currencyListCol} >
          
            <Text numberOfLines={1} style={styles.currencyText}>
            {currency.code}
            </Text>
          </Col>                                     
          <Col style={styles.currencyListCol} >
          
          <Text numberOfLines={1} style={styles.currencyText}>
            {currency.buyed}
           </Text>
        </Col> 
        <Col style={styles.currencyListCol} >
          
          <Text numberOfLines={1} style={styles.currencyText}>
          {currency.sold}
          </Text>
        </Col> 
           </Row>
           ))
          }
     
        </Grid>
           
          
        </Content>
        {/* <Footer >
  <FooterTab style={{backgroundColor:"white"}}>
    <Button active={true} style={{backgroundColor:"white",color:"#000"}} >
      <Icon active={true} name="info" size={20} style={{color:"#F05742"}}/>
      <Text style={{color:"#000",textTransform:'capitalize'}}>Information</Text>
    </Button>
   
  </FooterTab>
</Footer> */}
      </Container>
    );
        }
        return(<Container ></Container>);
  }
}

export default withNavigation(ExchangeList);

