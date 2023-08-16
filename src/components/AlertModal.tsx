// library imports
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
// Component imports
import Button from './Button';
import colors from '../utils/colors';
import {normalize, screenWidth, vh, vw} from '../utils/Dimension';

// util imports

type Props = {
  heading?: string;
  msg: string;
  leftBtnText?: string;
  onLeftBtnPress?: () => void;
  leftBtnContainerStyle?: ViewStyle;
  leftBtnTextStyle?: TextStyle;
  rightBtnText: string;
  onRightBtnPress: () => void;
  rightBtnContainerStyle?: ViewStyle;
  rightBtnTextStyle?: TextStyle;
  buttonsContainerStyle?: ViewStyle;
};

export const AlertModal = forwardRef((props: Props, ref) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    leftBtnContainerStyle = {},
    leftBtnTextStyle = {},
    rightBtnContainerStyle = {},
    rightBtnTextStyle = {},
    buttonsContainerStyle = {},
  } = props;

  useImperativeHandle(ref, () => ({
    toggleModal: toggleModal,
  }));

  const toggleModal = () => {
    setIsModalVisible(p => !p);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <Pressable onPress={toggleModal} style={styles.transparentSpace}>
        <Pressable style={styles.bodyContainer}>
          <Text style={styles.modalHeading}>{props?.heading}</Text>
          <Text style={styles.modalMessage}>{props?.msg}</Text>
          <View style={[styles.blackBox, buttonsContainerStyle]}>
            {props?.onLeftBtnPress && props?.leftBtnText ? (
              <Button
                title={props?.leftBtnText}
                onPress={props?.onLeftBtnPress}
                containerStyle={{
                  ...styles.btn,
                  ...leftBtnContainerStyle,
                }}
                titleStyle={{...styles.leftBtnText, ...leftBtnTextStyle}}
              />
            ) : null}
            <Button
              title={props?.rightBtnText}
              onPress={props?.onRightBtnPress}
              containerStyle={{
                ...styles.btn,
                ...styles.rightBtnStyle,
                ...rightBtnContainerStyle,
              }}
              titleStyle={{...styles.rightBtnText, ...rightBtnTextStyle}}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  transparentSpace: {
    flex: 1,
    backgroundColor: `${colors.BLACK}40`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    backgroundColor: colors.PRIMARY_FOREGROUND,
    borderRadius: vh(28),
    width: screenWidth - vw(40),
    marginHorizontal: vw(20),
    overflow: 'hidden',
    padding: vw(24),
  },
  modalHeading: {
    color: colors.BLACK,
    fontSize: normalize(24),
  },
  modalMessage: {
    color: colors.BLACK,
    fontSize: normalize(16),
    marginVertical: vh(24),
    letterSpacing: 0.5,
    lineHeight: vh(24),
  },
  blackBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    // width: '45%',
    flex: 1,
  },
  rightBtnStyle: {
    backgroundColor: colors.PRIMARY_BG,
  },
  leftBtnText: {
    color: colors.SECONDARY_TEXT,
  },
  rightBtnText: {
    color: colors.BLACK,
  },
});
