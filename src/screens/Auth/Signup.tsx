//Library imports
import {Alert, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

//Component imports
import InputWithLabel from '../../components/InputWithLabel';
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

const Signup = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (txt: string) => {
    setEmail(txt);
  };

  const handlePasswordChange = (txt: string) => {
    setPassword(txt);
  };
  const handleConfirmPasswordChange = (txt: string) => {
    setConfirmPassword(txt);
  };
  const onPressLogin = () => {
    props.navigation.navigate(screenNames.LOGIN);
  };
  const onPressRegister = () => {
    setIsLoading(true);
    if (password === confirmPassword) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          setIsLoading(false);
          console.log('User account created & signed in!', res);
          props.navigation.navigate(screenNames.FULL_NAME);
        })
        .catch(error => {
          setIsLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
          console.error(error);
        });
    } else {
      setIsLoading(false);
      Alert.alert('Passwords do not match');
    }
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.PRIMARY_BG} />
      <View style={styles.upperContainer}>
        <Image source={IMAGES.SIGNUP_BG} style={styles.upperImage} />
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.headerText}>Register</Text>
        <Text style={styles.subHeaderText}>Create your account</Text>

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
        <InputWithLabel
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          mainContainerStyle={styles.inputStyle}
          placeholder="Confirm Password"
        />
        <Button
          title="Register"
          onPress={onPressRegister}
          containerStyle={styles.btnStyles}
          isLoading={isLoading}
          isDisabled={!(email && password && confirmPassword)}
        />
        <Text style={styles.alreadyHaveText}>
          Already have a account?{' '}
          <Text onPress={onPressLogin} style={styles.loginText}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Signup;

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
    flex: 0.65,
    margin: vw(24),
  },
  upperImage: {
    height: screenHeight / 3.2,
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
    marginTop: vh(20),
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
