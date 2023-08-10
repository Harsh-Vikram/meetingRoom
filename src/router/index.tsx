//Library imports
import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screen imports
import Home from '../screens/Home';

//Component imports
import BackButton from '../components/BackButton';

//Util imports
import colors from '../utils/colors';
import screenNames from '../utils/screenNames';
import {normalize, vh, vw} from '../utils/Dimension';
import RoomDetail from '../screens/RoomDetails/RoomDetail';
import LandingPage from '../screens/LandingPage/LandingPage';
import { IMAGES } from '../utils/images';
import ProfileDetail from '../screens/ProfileDetail/ProfileDetail';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
          name={screenNames.LANDING_PAGE}
          component={LandingPage}
          options={{
            headerShown: false
          }}
        />
    
        <Stack.Screen
          name={screenNames.HOME}
          component={Home}
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: styles.headerStyle,
            headerTitle: () => (
              <Text style={styles.heading}>Book Your Meeting</Text>
            ),
            headerRight: () => <Pressable onPress={()=>(navigation.navigate(screenNames.PROFILE_DETAIL))}>
              <Image source={IMAGES.PROFILE_IMAGE} style={styles.icon}/>
            </Pressable>
          })}
        />
        <Stack.Screen
          name={screenNames.ROOM_DETAIL}
          component={RoomDetail}
          options={({navigation}) => ({
            headerLeft: () => <BackButton navigation={navigation} />,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: styles.headerStyle,
          })}
        />
         <Stack.Screen
          name={screenNames.PROFILE_DETAIL}
          component={ProfileDetail}
          options={({navigation}) => ({
            headerTitle: () => (
              <Text style={styles.heading}>Profile</Text>
            ),
            headerLeft: () => <BackButton navigation={navigation} />,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: styles.headerStyle,
          })}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: vw(20),
  },
  heading: {
    fontSize: normalize(22),
    color: colors.PRIMARY_TEXT,
    fontWeight: 'bold',
    letterSpacing: vw(1),
  },
  headerStyle: {
    backgroundColor: colors.PRIMARY_BG,
  },
  icon:{
    height:vh(30),
    width:vw(30),
    marginRight:20,
    resizeMode:'contain'
  }
});
