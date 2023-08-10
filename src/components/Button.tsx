//Library imports
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';

//Util imports
import {normalize, vh, vw} from '../utils/Dimension';
import colors from '../utils/colors';

type Props = {
  onPress: () => void;
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  isDisabled?: boolean;
  isLoading?: boolean;
};

const Button = (props: Props) => {
  const {isDisabled = false, isLoading = false} = props;
  return (
    <Pressable
      style={[
        styles.mainContainer,
        props?.containerStyle,
        {opacity: isDisabled ? 0.5 : 1},
      ]}
      onPress={isDisabled ? null : isLoading ? null : props?.onPress}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.WHITE} />
      ) : (
        <Text style={[styles.titleText, props?.titleStyle]}>
          {props?.title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingVertical: vh(16),
    paddingHorizontal: vw(24),
    height: vh(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.SECONDARY_BG,
  },
  titleText: {
    fontSize: normalize(16),
    letterSpacing: 1,
    color: colors.SECONDARY_TEXT,
  },
});
