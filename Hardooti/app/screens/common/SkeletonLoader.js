import { Container, Header,Left,Body,Right,Text, Spinner } from "native-base";
import React, { Component } from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ProgressLoader from "./ProgressLoader";

class SkeletonLoader extends Component
{

skeleton =()=>
{
return(    <SkeletonPlaceholder >
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
      <SkeletonPlaceholder.Item width={100} height={80} borderRadius={0} />
      <SkeletonPlaceholder.Item marginLeft={20}>
        <SkeletonPlaceholder.Item width={200} height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={100}
          height={20}
          borderRadius={4}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>);
}

render () {
  return (
<Container>
<Header style={{backgroundColor:"#fff"}} androidStatusBarColor="#F05742">
            <Left>
            </Left>
            <Body>
            </Body>
            <Right>
            <Spinner color='#F05742' size={25} />

            </Right>
          </Header>  
    <View style={{marginTop:20,marginLeft:30}}>    
    {this.skeleton()}
    </View>
    <View  style={{marginTop:20,marginLeft:30}}>    
    {this.skeleton()}
    </View>

    <View  style={{marginTop:20,marginLeft:30}}>    
    {this.skeleton()}
    </View>
    <View  style={{marginTop:20,marginLeft:30}}>    
    {this.skeleton()}
    </View>
    <View  style={{marginTop:20,marginLeft:30}}>    
    {this.skeleton()}
    </View>
    <View  style={{marginTop:20,marginLeft:30}}>    
    {this.skeleton()}
    </View>
    <View  style={{marginTop:20,marginLeft:30}}>    
    {this.skeleton()}
    </View>
</Container>
  );
}
}

export default  SkeletonLoader;