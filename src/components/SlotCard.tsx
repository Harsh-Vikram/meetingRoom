//Library imports
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

//Util imports
import colors from '../utils/colors';
import {IMAGES} from '../utils/images';
import {SlotDataType} from '../utils/types';
import {normalize, vh, vw} from '../utils/Dimension';

type Props = {
  data: SlotDataType;
  selectedSlot: string;
  setSelectedSlot: Dispatch<SetStateAction<string>>;
  index: number;
};

const SlotCard = (props: Props) => {
  const onSlotPress = () => {
    props?.setSelectedSlot(
      `${props?.index}-${props.data?.startTime}-${props.data?.endTime}`,
    );
  };
  return (
    <Pressable
      style={[
        styles.eachTimeSlots,
        {
          opacity: props?.data?.isOccupied ? 0.5 : 1,
        },
      ]}
      onPress={props?.data?.isOccupied ? null : onSlotPress}>
      <View style={styles.columnOne}>
        <View style={styles.row1}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor: props?.data?.isOccupied
                  ? colors.RED
                  : colors.GREEN,
              },
            ]}
          />
          <Text style={styles.timingText}>
            {props?.data?.startTime} - {props?.data?.endTime}
          </Text>
        </View>
        {props?.data?.isOccupied && (
          <Text style={styles.occupiedText}>
            Occupied By: {props?.data?.occupiedBy?.email}{' '}
            {props?.data?.occupiedBy?.name}
          </Text>
        )}
      </View>
      {props?.selectedSlot ===
        `${props?.index}-${props.data?.startTime}-${props.data?.endTime}` && (
        <Image source={IMAGES.CHECK_MARK} style={styles.checkMark} />
      )}
    </Pressable>
  );
};

export default SlotCard;

const styles = StyleSheet.create({
  eachTimeSlots: {
    backgroundColor: colors.PRIMARY_FOREGROUND,
    borderRadius: vw(8),
    padding: vw(10),
    borderWidth: vw(2),
    borderColor: colors.WHITE,
    marginVertical: vh(6),
    flexDirection: 'row',

    marginHorizontal: vw(20),
    height: vh(60),
  },
  columnOne: {
    flex: 1,
    justifyContent: 'center',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: vh(16),
    width: vh(16),
    borderRadius: vh(10),
    marginRight: vw(10),
  },
  timingText: {
    fontSize: normalize(16),
    color: colors.PRIMARY_TEXT,
    letterSpacing: 0.7,
    flex: 1,
  },
  occupiedText: {
    marginTop: vh(4),
    fontSize: normalize(12),
    color: colors.PRIMARY_TEXT,
    letterSpacing: 0.7,
  },
  checkMark: {
    height: vh(26),
    width: vh(26),
    resizeMode: 'contain',
  },
});
