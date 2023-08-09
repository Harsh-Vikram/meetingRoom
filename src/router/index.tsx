//Library imports
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screen imports
import Home from '../screens/Home';

//Component imports
import BackButton from '../components/BackButton';

//Util imports
import colors from '../utils/colors';
import screenNames from '../utils/screenNames';
import {normalize, vw} from '../utils/Dimension';
import RoomDetail from '../screens/RoomDetails/RoomDetail';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
});
