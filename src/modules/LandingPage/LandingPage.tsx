//Library imports
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

//Component imports
import Button from '../../components/Button';

//Util imports
import {
  vh,
  vw,
  normalize,
  screenHeight,
  screenWidth,
} from '../../utils/Dimension';
import colors from '../../utils/colors';
import {IMAGES} from '../../utils/images';
import screenNames from '../../utils/screenNames';

type Props = {};

const LandingPage = (props: Props) => {
  const onPressGetStarted = () => {
    props.navigation.navigate(screenNames.SIGNUP);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.PRIMARY_BG} />
      <View style={styles.upperContainer}>
        <Image style={styles.image} source={IMAGES.LANDING_PAGE} />
      </View>
      <View style={styles.topView}>
        <Text style={styles.textTitle}>Hello Everyone !</Text>
        <Text style={styles.descriptionText}>
          Let's upgrade your meeting experience{' '}
        </Text>
        <View style={styles.buttonView}>
          <Button title="Get Started" onPress={onPressGetStarted} />
        </View>
      </View>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BG,
  },
  heading: {
    fontSize: normalize(22),
    color: colors.PRIMARY_TEXT,
    fontWeight: 'bold',
    letterSpacing: vw(1),
  },
  upperContainer: {
    flex: 0.8,
    margin: vw(24),
  },
  flatListStyle: {
    backgroundColor: colors.PRIMARY_BG,
  },
  imageView: {
    height: '100%',
  },
  image: {
    height: screenHeight / 2.6,
    width: screenWidth - vw(48),
    resizeMode: 'contain',
  },
  topView: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderTopRightRadius: vw(50),
    borderTopLeftRadius: vw(50),
    paddingHorizontal: vw(25),
    paddingVertical: vh(30),
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
  descriptionText: {
    fontSize: normalize(20),
    marginVertical: 20,
  },
});
