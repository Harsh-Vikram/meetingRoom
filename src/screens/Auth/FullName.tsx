import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {normalize, screenHeight, vh, vw} from '../../utils/Dimension';
import colors from '../../utils/colors';
import InputWithLabel from '../../components/InputWithLabel';
import Button from '../../components/Button';
import screenNames from '../../utils/screenNames';

type Props = {};

const FullName = (props: Props) => {
  const [fullName, setFullName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFullNameChange = (txt: string) => {
    setFullName(txt);
  };

  const onPressContinue = () => {
    setIsLoading(true);
    const update = {
      displayName: fullName,
    };

    auth()
      .currentUser.updateProfile(update)
      .then(res => {
        setIsLoading(false);
        console.log('res', res);
        props.navigation.navigate(screenNames.HOME);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('error', err);
      });
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Enter Your Name</Text>
      <Text style={styles.subHeaderText}>
        Please provide us with your good name.
      </Text>
      <InputWithLabel
        value={fullName}
        onChangeText={handleFullNameChange}
        mainContainerStyle={styles.inputStyle}
        placeholder="Full Name"
      />
      <Button
        title="Continue"
        onPress={onPressContinue}
        containerStyle={styles.btnStyles}
        isDisabled={!fullName}
        isLoading={isLoading}
      />
    </View>
  );
};

export default FullName;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BG,
    paddingHorizontal: vw(25),
    paddingVertical: vh(60),
  },
  headerText: {
    fontSize: normalize(30),
    color: colors.BLUE,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: normalize(16),
    color: colors.GREY,
  },
  inputStyle: {
    marginTop: vh(20),
    width: '100%',
  },
  btnStyles: {
    marginTop: vh(60),
  },
});
