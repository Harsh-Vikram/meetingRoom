//Library imports
import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

//Screen imports
import Home from '../screens/Home';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import FullName from '../screens/Auth/FullName';
import LandingPage from '../screens/LandingPage/LandingPage';
import RoomDetail from '../screens/RoomDetails/RoomDetail';
import ProfileDetail from '../screens/ProfileDetail/ProfileDetail';

//Component imports
import BackButton from '../components/BackButton';

//Util imports
import colors from '../utils/colors';
import {IMAGES} from '../utils/images';
import screenNames from '../utils/screenNames';
import {normalize, vh, vw} from '../utils/Dimension';

const Stack = createStackNavigator();
const Router = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  console.log('user', user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;
  // initialRouteName={user ? screenNames.HOME : screenNames.SIGNUP}
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={screenNames.LANDING_PAGE}
          component={LandingPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={screenNames.SIGNUP}
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={screenNames.LOGIN}
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={screenNames.FULL_NAME}
          component={FullName}
          options={{
            headerShown: false,
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
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate(screenNames.PROFILE_DETAIL)}>
                <Image source={IMAGES.PROFILE_IMAGE} style={styles.icon} />
              </Pressable>
            ),
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
            headerTitle: () => <Text style={styles.heading}>Profile</Text>,
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
  icon: {
    height: vh(30),
    width: vw(30),
    marginRight: 20,
    resizeMode: 'contain',
  },
});
