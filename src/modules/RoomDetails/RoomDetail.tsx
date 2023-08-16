//Library imports
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';

//Component imports
import SlotCard from '../../components/SlotCard';
import Button from '../../components/Button';

//Util imports
import colors from '../../utils/colors';
import {normalize, vh, vw} from '../../utils/Dimension';
import {SlotDataType} from '../../utils/types';
import {bookSlot} from '../../utils/FirebaseAPICalls';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

type Props = {};

const RoomDetail = (props: Props) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const {roomNumber, roomId, slots} = props.route.params;
  console.log(props.route.params);
  const {email, uid, displayName} = useSelector(
    (state: RootState) => state.auth.user,
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.heading}>Room Number {roomNumber}</Text>
      ),
    });
  });

  const onPressBookMeeting = () => {
    bookSlot(roomId, Number(selectedSlot.split('-')[0]), {
      id: uid,
      name: displayName,
      email: email,
    });
  };

  const renderItems = ({item, index}: {item: SlotDataType; index: number}) => (
    <SlotCard
      data={item}
      selectedSlot={selectedSlot}
      setSelectedSlot={setSelectedSlot}
      index={index}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={slots}
        renderItem={renderItems}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
      />
      <Button
        title="Book Meeting Room"
        onPress={onPressBookMeeting}
        isDisabled={!selectedSlot}
      />
    </View>
  );
};

export default RoomDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BG,
  },
  heading: {
    fontSize: normalize(22),
    color: colors.PRIMARY_TEXT,
    fontWeight: 'bold',
    letterSpacing: vw(1),
  },
  flatListStyle: {
    backgroundColor: colors.PRIMARY_BG,
  },
});
