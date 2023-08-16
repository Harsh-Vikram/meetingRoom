//Library imports
import {Alert, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

//Component imports
import Button from '../../components/Button';
import InputWithLabel from '../../components/InputWithLabel';
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

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (txt: string) => {
    setEmail(txt);
  };

  const handlePasswordChange = (txt: string) => {
    setPassword(txt);
  };

  const onPressRegister = () => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        setIsLoading(false);
        props.navigation.reset({
          index: 0,
          routes: [
            {
              name: !res.user.displayName
                ? screenNames.FULL_NAME
                : screenNames.HOME,
            },
          ],
        });
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Incorrect Password');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        console.error(error);
      });
  };

  const onPressSignup = () => {
    props.navigation.navigate(screenNames.SIGNUP);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.PRIMARY_BG} />
      <View style={styles.upperContainer}>
        <Image source={IMAGES.LOGIN_BG} style={styles.upperImage} />
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.headerText}>Login</Text>
        <Text style={styles.subHeaderText}>Login to your account</Text>
        <InputWithLabel
          value={email}
          onChangeText={handleEmailChange}
          mainContainerStyle={styles.inputStyle}
          placeholder="Email"
        />
        <InputWithLabel
          value={password}
          onChangeText={handlePasswordChange}
          mainContainerStyle={styles.inputStyle}
          forPassword
          placeholder="Password"
        />
        <Button
          title="Login"
          onPress={onPressRegister}
          containerStyle={styles.btnStyles}
          isLoading={isLoading}
          isDisabled={!(email && password)}
        />
        <Text style={styles.alreadyHaveText}>
          Don't have an account?{' '}
          <Text onPress={onPressSignup} style={styles.loginText}>
            Create one.
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BG,
  },
  headerText: {
    fontSize: normalize(40),
    color: colors.BLUE,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: normalize(20),
    color: colors.GREY,
  },
  upperContainer: {
    flex: 0.8,
    margin: vw(24),
    paddingTop: vh(20),
  },
  upperImage: {
    height: screenHeight / 3,
    width: screenWidth - vw(48),
    resizeMode: 'contain',
  },
  lowerContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderTopRightRadius: vw(50),
    borderTopLeftRadius: vw(50),
    paddingHorizontal: vw(25),
    paddingVertical: vh(30),
  },
  inputStyle: {
    marginTop: vh(20),
    width: '100%',
  },
  btnStyles: {
    marginTop: vh(40),
  },
  alreadyHaveText: {
    fontSize: normalize(12),
    color: colors.GREY,
    alignSelf: 'center',
    marginTop: vh(12),
  },
  loginText: {
    color: colors.BLUE,
    textDecorationLine: 'underline',
  },
});
