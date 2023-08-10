//Library imports
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
//Util imports
import colors from '../utils/colors';
import {IMAGES} from '../utils/images';
import {normalize, vh, vw} from '../utils/Dimension';

interface Props {
  value: string;
  placeholder?: string;
  forPassword?: boolean;
  onChangeText: (val: string) => void;
  mainContainerStyle?: ViewStyle;
}

const InputWithLabel = (props: Props) => {
  const {placeholder = '', mainContainerStyle = {}} = props;
  const [isPassVisible, setIsPassVisible] = useState(false);

  const onTogglePrivacy = () => {
    setIsPassVisible(p => !p);
  };

  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={props?.value}
          secureTextEntry={props?.forPassword && !isPassVisible}
          onChangeText={props?.onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.GREY}
        />
        {props?.forPassword && (
          <Pressable onPress={onTogglePrivacy}>
            <Image
              source={isPassVisible ? IMAGES?.SHOW : IMAGES?.HIDDEN}
              style={styles.passShowHideBtn}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default InputWithLabel;

const styles = StyleSheet.create({
  mainContainer: {},
  textInput: {
    flex: 1,
    paddingHorizontal: vw(0),
    paddingVertical: vh(5),
    fontSize: normalize(16),
    color: colors.BLUE,
    marginLeft: vw(16),
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.PRIMARY_FOREGROUND,
    paddingVertical: vh(10),
    paddingRight: vw(16),
    alignItems: 'center',
  },
  passShowHideBtn: {
    height: vh(26),
    width: vh(26),
    tintColor: colors.BLUE,
    resizeMode: 'contain',
  },
});
