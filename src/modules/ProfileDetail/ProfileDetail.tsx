//Library imports
import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

//Component imports
import Button from '../../components/Button';
import InputWithLabel from '../../components/InputWithLabel';

//Util imports
import colors from '../../utils/colors';
import {IMAGES} from '../../utils/images';
import {normalize, vh, vw} from '../../utils/Dimension';
import screenNames from '../../utils/screenNames';

type Props = {};

const ProfileDetail = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPressLogout = () => {
    setIsLoading(true);
    auth()
      .signOut()
      .then(() => {
        setIsLoading(false);
        props.navigation.reset({
          index: 0,
          routes: [{name: screenNames.LANDING_PAGE}],
        });
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Image source={IMAGES.MAN} style={styles.image} />
      <Image source={IMAGES.EDIT} style={styles.icon} />
      <InputWithLabel
        mainContainerStyle={styles.textView}
        value="Full Name"
        onChangeText={() => {}}
      />
      <InputWithLabel
        mainContainerStyle={styles.textView}
        value="Phone Number"
        onChangeText={() => {}}
      />
      <InputWithLabel
        mainContainerStyle={styles.textView}
        value="Email"
        onChangeText={() => {}}
      />
      <Button
        title="Logout"
        onPress={onPressLogout}
        containerStyle={styles.btnStyles}
        isLoading={isLoading}
      />
    </View>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BG,
    padding: 10,
  },
  heading: {
    fontSize: normalize(22),
    color: colors.PRIMARY_TEXT,
    fontWeight: 'bold',
    letterSpacing: vw(1),
  },
  flatListStyle: {
    backgroundColor: colors.PRIMARY_BG,
  },
  imageView: {
    height: '100%',
  },
  image: {
    width: '60%',
    height: '35%',
    resizeMode: 'center',
    alignSelf: 'center',
  },
  topView: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderTopRightRadius: vw(50),
    borderTopLeftRadius: vw(50),
  },
  textView: {
    marginTop: vw(20),
  },
  buttonView: {
    right: vw(20),
    position: 'absolute',
    bottom: vh(20),
    width: '50%',
    alignSelf: 'flex-end',
  },
  textTitle: {
    fontSize: normalize(40),
    width: '60%',
    fontWeight: 'bold',
    color: colors.BLUE,
  },
  icon: {
    bottom: 60,
    left: 50,
    height: vh(50),
    width: vw(50),
    resizeMode: 'center',
    alignSelf: 'center',
    zIndex: 10,
  },
  btnStyles: {
    marginTop: vh(40),
  },
});
