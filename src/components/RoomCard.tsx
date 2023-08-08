//Library imports
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
//Util imports
import {vh, vw} from '../utils/Dimension';
import {RoomDetailType} from '../utils/types';

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
    <Pressable onPress={() => props?.onPress(props.data)}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{props.roomTitle}</Text>
          <Text style={{marginLeft: 20}}>{props.roomNumber}</Text>
        </View>
        <Image source={props.imageName} style={styles.icon} />
      </View>
    </Pressable>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 10,
    lineHeight: 2,
    borderWidth: 1,
  },
  icon: {
    height: vh(54),
    width: vw(54),
    resizeMode: 'contain',
  },
});
