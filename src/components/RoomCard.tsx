//Library imports
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

//Util imports
import {normalize, screenWidth, vh, vw} from '../utils/Dimension';
import {RoomDetailType} from '../utils/types';
import colors from '../utils/colors';
import ShimmerView from './ShimmerView';

type Props = {
  navigation?: any;
  onPress: (roomDetail: RoomDetailType) => void;
  imageName?: any;
  roomTitle?: string;
  roomNumber?: string;
  data: RoomDetailType | string;
};

const RoomCard = (props: Props) => {
  return (
    <>
      {props?.data == '' ? (
        <ShimmerView style={styles.container} />
      ) : (
        <Pressable
          style={[styles.container, styles.mainCard]}
          onPress={() => props?.onPress(props.data)}>
          <Text style={styles.roomNoText}>{props.roomTitle}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image source={props.imageName} style={styles.icon} />
            <Text style={styles.roomNo}>{props.roomNumber}</Text>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2 - vw(36),
    height: vh(110),
    borderRadius: vw(8),
    borderWidth: vw(2),
    borderColor: colors.WHITE,
    backgroundColor: colors.PRIMARY_FOREGROUND,
    marginBottom: vh(20),
  },
  mainCard: {
    padding: vw(10),
  },
  roomNoText: {
    fontSize: normalize(12),
    color: colors.PRIMARY_TEXT,
  },
  roomNo: {
    marginLeft: vw(20),
    fontSize: normalize(46),
    letterSpacing: 2,
    color: colors.BLUE,
  },
  icon: {
    height: vh(54),
    width: vw(54),
    resizeMode: 'contain',
  },
});
