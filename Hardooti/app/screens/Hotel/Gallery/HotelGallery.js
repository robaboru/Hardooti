import React, { Component } from 'react';
import { Image,ActivityIndicator,TouchableHighlight,Alert } from 'react-native';
import { Container, Button, View, Header, Card, Right, Thumbnail, Text, Left,Spinner, Body, Icon, Title } from 'native-base';
import Gallery from 'react-native-image-gallery';
import { withNavigation } from 'react-navigation';
import HttpService from '../../../services/HttpService';
import Exception from '../../common/Exception';
class HotelGallery extends Component{
    constructor (props) 
    {
        super(props);
        this.state = {
            index: 0,
            isException:false,
            images: [],
            imageListFromApi:[],
          isLoading: true,
          baseUrl:HttpService.baseUrl  
            
        };
        this.abortController = new AbortController();

        this.onChangeImage = this.onChangeImage.bind(this);
    }
    componentDidMount()
    {
   this.getHotelGalleryFromApi().done();
    }
    componentWillUnmount() 
      {
        if(this.state.isLoading)
        {
          this.abortController.abort(); 
        }     
      }
    async  getHotelGalleryFromApi() {
      try 
      {
        this.abortController = new AbortController();
        const { navigation } = this.props;
        var hotel  = navigation.getParam('hotel', null);
        let response = await fetch(
          this.state.baseUrl+'/api/gallery/hotel/'+hotel.id,
          {
            method: 'GET',
            signal: this.abortController.signal,
        }
        );
        let responseJson = await response.json();
        this.setState({isLoading:false});
        this.setState({imageListFromApi:responseJson.galleries});
        for(let i=0;i<this.state.imageListFromApi.length;i++)
        {
        this.state.images[i]={ source: { uri: this.state.baseUrl+this.state.imageListFromApi[i].photo } };
        this.setState({index:0});
        };
       
        return responseJson;
      } catch (error) 
      {
        this.setState({isLoading:false});
        if (error.name != 'AbortError') 
        {
         this.setState({isException:true});
        }
      }
    }
    
    get galleryCount () {
        const { index, images } = this.state;
        return (
            <View style={{ top: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                <Button transparent onPress={() => this.props.navigation.goBack()} >
              <Icon name="arrow-back" style={{color:"white"}}/>
            </Button>
                <Text style={{ textAlign: 'right', color: 'white', fontSize: 15, paddingRight: '10%' }}>{ index + 1 } / { images.length }</Text>
            </View>
        );
    }
    onChangeImage (index) {
        this.setState({ index });
    }
  render() {
    if(this.state.isLoading)
    {
      return(
        <Container style={{backgroundColor:"#000"}}>
       
          <Spinner color='#F05742' style={{flex: 1}}/>
        </Container>
      )
    }
    
    if(this.state.isException){
      return(
        
        <Exception />
        
      )
    }
    return (
      <Container style={{backgroundColor:"#000"}}>
       
      <Gallery
        style={{ flex: 1, backgroundColor: '#000'}}
        images={this.state.images}
        onPageSelected={this.onChangeImage}
        initialPage={0}
      />
      { this.galleryCount }
      </Container>
    );
   
  }
}
export default withNavigation(HotelGallery);