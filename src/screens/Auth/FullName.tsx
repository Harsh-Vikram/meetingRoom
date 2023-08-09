import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {normalize, screenHeight, vh, vw} from '../../utils/Dimension';
import colors from '../../utils/colors';
import InputWithLabel from '../../components/InputWithLabel';
import Button from '../../components/Button';

type Props = {};

const FullName = (props: Props) => {
  const [fullName, setFullName] = useState<string>('');

  const handleFullNameChange = (txt: string) => {
    setFullName(txt);
  };

  const onPressContinue = () => {};
  return (
    <Pressable onPress={props.navigation.goBack} style={styles.mainContainer}>
      <View style={styles.innerContainer}>
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
        />
      </View>
    </Pressable>
  );
};

export default FullName;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: `${colors.BLACK}40`,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    backgroundColor: colors.WHITE,
    height: screenHeight / 2.5,
    borderTopRightRadius: vw(50),
    borderTopLeftRadius: vw(50),
    paddingHorizontal: vw(25),
    paddingVertical: vh(30),
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
    marginTop: vh(20),
  },
});
