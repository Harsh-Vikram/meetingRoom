//Library imports
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

//Util imports
import {normalize, vh, vw} from '../utils/Dimension';
import {RoomDetailType} from '../utils/types';
import colors from '../utils/colors';

type Props = {
  navigation?: any;
  onPress: (roomDetail: RoomDetailType) => void;
  imageName?: any;
  roomTitle?: string;
  roomNumber?: string;
  data: RoomDetailType;
};

const RoomCard = (props: Props) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => props?.onPress(props.data)}>
      <Text style={styles.roomNoText}>{props.roomTitle}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image source={props.imageName} style={styles.icon} />
        <Text style={styles.roomNo}>{props.roomNumber}</Text>
      </View>
    </Pressable>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: vw(8),
    padding: vw(10),
    borderWidth: vw(2),
    borderColor: colors.WHITE,
    backgroundColor: colors.PRIMARY_FOREGROUND,
    marginBottom: vh(20),
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
