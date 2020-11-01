import React, { Component } from 'react';
import {Container, Content, Header, Left, Right, Icon} from 'native-base';
import { AsyncStorage  } from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import CategoryList from './app/screens/Category/CategoryList';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Hotel from './app/screens/Hotel/Hotel';
import NearestHotel from './app/screens/Hotel/Nearest/NearestHotel';
import HotelDetail from './app/screens/Hotel/HotelDetail';
import HotelList from './app/screens/Hotel/HotelList';
import HotelSearchByCity from './app/screens/Hotel/HotelSearch/HotelSearchByCity';
import HotelListByCity from './app/screens/Hotel/HotelSearch/HotelListByCity';
import HotelService from './app/screens/Hotel/HotelServices';
import HotelLocation from './app/screens/Hotel/HotelLocation';
import HotelRoomList from './app/screens/Hotel/Room/HotelRoomList';
import HotelRoomDetail from './app/screens/Hotel/Room/HotelRoomDetail';
import HotelContactInformation from './app/screens/Hotel/HotelContactInformation';
import MealMenu from './app/screens/Hotel/Menu/Meal';
import DrinkMenuList from './app/screens/Hotel/Menu/Drinks';
import HotelGallery from './app/screens/Hotel/Gallery/HotelGallery';
import RestaurantList from './app/screens/Restraunt/RestrauntList';
import NearestRestraunt from './app/screens/Restraunt/Nearest/NearestRestaurant';
import RestaurantDrinkMenuList from './app/screens/Restraunt/Menu/Drinks';
import RestaurantMealMenuList from './app/screens/Restraunt/Menu/Meal';
import RestaurantLocation from './app/screens/Restraunt/Location/Location';
import Home from './app/screens/Home/Home';
import SplashScreen from 'react-native-splash-screen';
import Restraunt from './app/screens/Restraunt/Restraunt';
import NearestCategoryList from './app/screens/Category/NearestCategoryList';
import GuestHouseList from './app/screens/GuestHouse/GuestHouseList';
import GuestHouseSearchByCity from './app/screens/GuestHouse/GuestHouseSearch/GuestHouseSearchByCity';
import RestaurantSearchByCity from './app/screens/Restraunt/RestaurantSearch/RestaurantSearchByCity';
import GuestHouseListByCity from './app/screens/GuestHouse/GuestHouseSearch/GuestHouseListByCity';
import RestaurantListByCity from './app/screens/Restraunt/RestaurantSearch/RestaurantListByCity';
import NearestGuestHouse from './app/screens/GuestHouse/Nearest/NearestGuestHouse';
import GuestHouseRoomList from './app/screens/GuestHouse/Room/GuestHouseRoomList';
import GuestHouseLocation from './app/screens/GuestHouse/Location/GuestHouseLocation';
import GuestHouseContactInformation from './app/screens/GuestHouse/Information/GuestHouseContactInformation';
import GuestHouseRoomDetail from './app/screens/GuestHouse/Room/GuestHouseRoomDetail';
import Exception from './app/screens/common/Exception';
import CafeList from './app/screens/Cafe/CafeList';
import CafeContactInformation from './app/screens/Cafe/CafeInformation';
import CafeDrinkMenuList from './app/screens/Cafe/Menu/Drinks';
import CafeMealMenuList from './app/screens/Cafe/Menu/Food';
import CafeLocation from './app/screens/Cafe/Location/CafeLocation';
import CafeSearchByCity from './app/screens/Cafe/CafeSearch/CafeSearchByCity';
import CafeListByCity from './app/screens/Cafe/CafeSearch/CafeListByCity';
import NearestCafe from './app/screens/Cafe/Nearest/NearestCafe';
import NearestClub from './app/screens/Club/Nearest/NearestClub';
import ClubList from './app/screens/Club/ClubList';
import ClubLocation from './app/screens/Club/ClubLocation';
import ClubInformation from './app/screens/Club/ClubInformation';
import ClubListByCity from './app/screens/Club/ClubSearch/ClubListByCity';
import ClubSearchByCity from './app/screens/Club/ClubSearch/ClubSearchByCity';
import EventList from './app/screens/Event/EventList';
import EventInformation from './app/screens/Event/Information/EventInformation';
import EventLocation from './app/screens/Event/Location/EventLocation';
import NearestEvent from './app/screens/Event/Nearest/NearestEvent';
import BankList from './app/screens/Exchange/BankList';
import ExchangeList from './app/screens/Exchange/ExchangeList';
import ContactUs from './app/screens/Contact-us/ContactUs';
import Help from './app/screens/Contact-us/Help';
import { createDrawerNavigator} from "react-navigation-drawer";
import MenuDrawer from './app/screens/Home/MenuDrawer';
import EventSearchByCity from './app/screens/Event/EventSearch/EventSearchByCity';
import EventListByCity from './app/screens/Event/EventSearch/EventListByCity';
import NearestHotelMap from './app/screens/Hotel/Nearest/NearestHotelMap';
import NearestRestaurantMap from './app/screens/Restraunt/Nearest/NearestRestaurantMap';
import TourAgencyList from './app/screens/TourAndTravel/TourAgencyList';
import TourAgencyInformation from './app/screens/TourAndTravel/TourAgencyInformation';
import TourAgencyDetail from './app/screens/TourAndTravel/TourAgencyDetail';
import TourAgencyService from './app/screens/TourAndTravel/TourAgencyServices';
import RestaurantInformation from './app/screens/Restraunt/RestaurantInformation';
import GuiderList from './app/screens/Guide/Guider-list';
import GuiderProfile from './app/screens/Guide/Guider-profile';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      isLoadingLocation:false,
      isException:false,
      location:null,
      coordinates:null
    };
  }
  componentDidMount() {
    this.findCoordinates();
    setTimeout(() => {
     
        SplashScreen.hide();
        AsyncStorage.setItem('coordinates', JSON.stringify(this.state.coordinates));
    }, 1000);
  }
  findCoordinates = () => 
  {
    this.setState({isLoadingLocation:true});
    Geolocation.getCurrentPosition(
        (position) => 
        {
            const location = position;
            this.setState({location});
            this.setState({isLoadingLocation:false});
            if(this.state.location != null)
            {
            var coordinates ={"lat":this.state.location.coords.latitude,"long":this.state.location.coords.longitude};
            this.setState({coordinates});
            }
        },
        (error) => 
        {
            this.setState({isLoadingLocation:false});
            this.setState({isException:true});
            this.setState({coordinates:null});
            // Alert.alert(
            //     null,
            //     error.code+"test",
            //     [               
            //       {text: 'Ok', onPress: () => this.props.navigation.goBack()},
            //     ],
            //     {cancelable: false},
            //   );
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };
  render() {
    return (
     <AppContainer />
    );
  }
}  
  
// const AppDraweer = createStackNavigator
// ({
// Welcome: { screen: Home }, 
// Preference: { screen: CategoryList },
// NearestPreference:{screen:NearestCategoryList},
// Hotel: { screen: Hotel },
// NearestHotel:{screen:NearestHotel},
// HotelList: { screen: HotelList },
// HotelSearchByCity:{screen:HotelSearchByCity},
// HotelListByCity:{screen:HotelListByCity},
// HotelDetail: { screen: HotelDetail },
// HotelRoomList:{screen:HotelRoomList},
// HotelRoomDetail:{screen:HotelRoomDetail},
// HotelMealMenu:{screen:MealMenu},
// HotelDrinkMenu:{screen:DrinkMenuList},
// HotelLocation:{screen:HotelLocation},
// HotelGallery:{screen:HotelGallery},
// HotelService:{screen:HotelService},
// HotelContactInformation:{screen:HotelContactInformation},
// RestaurantList: { screen: RestaurantList },
// RestaurantListByCity:{screen:RestaurantListByCity},
// NearestRestraunt:{screen:NearestRestraunt},
// RestaurantDrinkMenu:{screen:RestaurantDrinkMenuList},
// RestaurantMealMenu:{screen:RestaurantMealMenuList},
// RestaurantLocation:{screen:RestaurantLocation},
// RestaurantSearchByCity:{screen:RestaurantSearchByCity},
// GuestHouseList:{screen:GuestHouseList},
// GuestHouseListByCity:{screen:GuestHouseListByCity},
// GuestHouseSearchByCity:{screen:GuestHouseSearchByCity},
// NearestGuestHouse:{screen:NearestGuestHouse},
// GuestHouseRoomList:{screen:GuestHouseRoomList},
// GuestHouseRoomDetail:{screen:GuestHouseRoomDetail},
// GuestHouseLocation:{screen:GuestHouseLocation},
// GuestHouseContactInformation:{screen:GuestHouseContactInformation},
// CafeList:{screen:CafeList},
// CafeLocation:{screen:CafeLocation},
// CafeSearchByCity:{screen:CafeSearchByCity},
// CafeListByCity:{screen:CafeListByCity},
// CafeDrinkMenuList:{screen:CafeDrinkMenuList},
// CafeMealMenuList:{screen:CafeMealMenuList},
// CafeContactInformation:{screen:CafeContactInformation},
// NearestCafe:{screen:NearestCafe},
// ClubList:{screen:ClubList},
// ClubListByCity:{screen:ClubListByCity},
// ClubSearchByCity:{screen:ClubSearchByCity},
// ClubLocation:{screen:ClubLocation},
// ClubInformation:{screen:ClubInformation},
// NearestClub:{screen:NearestClub},
// EventList:{screen:EventList},
// EventInformation:{screen:EventInformation},
// EventLocation:{screen:EventLocation},
// NearestEvent:{screen:NearestEvent},
// BankList:{screen:BankList},
// ExchangeList:{screen:ExchangeList},
// ContactUs :{screen:ContactUs},
// Help:{screen:Help},
// Exception:{screen:Exception}
// },
// {
//     headerMode: "none"
// });

// const AppContainer = createAppContainer(AppDraweer);
const Drawer = createDrawerNavigator(
  {
    Welcome: { screen: CategoryList }
   
    
  },
  {
    initialRouteName: "Welcome",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <MenuDrawer {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    NearestPreference:{screen:NearestCategoryList},
    Hotel: { screen: Hotel },
    NearestHotel:{screen:NearestHotel},
    NearestHotelMap:{screen:NearestHotelMap},
    HotelList: { screen: HotelList },
    HotelSearchByCity:{screen:HotelSearchByCity},
    HotelListByCity:{screen:HotelListByCity},
    HotelDetail: { screen: HotelDetail },
    HotelRoomList:{screen:HotelRoomList},
    HotelRoomDetail:{screen:HotelRoomDetail},
    HotelMealMenu:{screen:MealMenu},
    HotelDrinkMenu:{screen:DrinkMenuList},
    HotelLocation:{screen:HotelLocation},
    HotelGallery:{screen:HotelGallery},
    HotelService:{screen:HotelService},
    HotelContactInformation:{screen:HotelContactInformation},
    RestaurantList: { screen: RestaurantList },
    RestaurantListByCity:{screen:RestaurantListByCity},
    NearestRestraunt:{screen:NearestRestraunt},
    RestaurantDrinkMenu:{screen:RestaurantDrinkMenuList},
    RestaurantMealMenu:{screen:RestaurantMealMenuList},
    RestaurantLocation:{screen:RestaurantLocation},
    RestaurantSearchByCity:{screen:RestaurantSearchByCity},
    RestaurantInformation:{screen:RestaurantInformation},
    NearestRestaurantMap:{screen:NearestRestaurantMap},
    GuestHouseList:{screen:GuestHouseList},
    GuestHouseListByCity:{screen:GuestHouseListByCity},
    GuestHouseSearchByCity:{screen:GuestHouseSearchByCity},
    NearestGuestHouse:{screen:NearestGuestHouse},
    GuestHouseRoomList:{screen:GuestHouseRoomList},
    GuestHouseRoomDetail:{screen:GuestHouseRoomDetail},
    GuestHouseLocation:{screen:GuestHouseLocation},
    GuestHouseContactInformation:{screen:GuestHouseContactInformation},
    CafeList:{screen:CafeList},
    CafeLocation:{screen:CafeLocation},
    CafeSearchByCity:{screen:CafeSearchByCity},
    CafeListByCity:{screen:CafeListByCity},
    CafeDrinkMenuList:{screen:CafeDrinkMenuList},
    CafeMealMenuList:{screen:CafeMealMenuList},
    CafeContactInformation:{screen:CafeContactInformation},
    NearestCafe:{screen:NearestCafe},
    ClubList:{screen:ClubList},
    ClubListByCity:{screen:ClubListByCity},
    ClubSearchByCity:{screen:ClubSearchByCity},
    ClubLocation:{screen:ClubLocation},
    ClubInformation:{screen:ClubInformation},
    NearestClub:{screen:NearestClub},
    EventList:{screen:EventList},
    EventInformation:{screen:EventInformation},
    EventLocation:{screen:EventLocation},
    NearestEvent:{screen:NearestEvent},
    EventSearchByCity:{screen:EventSearchByCity},
    EventListByCity:{screen:EventListByCity},
    BankList:{screen:BankList},
    ExchangeList:{screen:ExchangeList},
    TourAgencyList:{screen:TourAgencyList},
    TourAgencyInformation:{screen:TourAgencyInformation},
    TourAgencyDetail:{screen:TourAgencyDetail},
    TourAgencyService:{screen:TourAgencyService},
    TourGuiderList:{screen:GuiderList},
    GuiderDetail:{screen:GuiderProfile},
    ContactUs :{screen:ContactUs},
    Help:{screen:Help},
    Exception:{screen:Exception}
 },
  
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

// export default () =>
//   <Root>
//     <AppContainer />
//   </Root>;
