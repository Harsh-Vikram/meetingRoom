//Library imports
import {useSelector} from 'react-redux';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';

//Component imports
import SlotCard from '../../components/SlotCard';
import Button from '../../components/Button';

//Util imports
import colors from '../../utils/colors';
import {RootState} from '../../store';
import {normalize, vh, vw} from '../../utils/Dimension';
import {RoomDetailType, SlotDataType} from '../../utils/types';
import {bookSlot, getRoomDetail} from '../../utils/FirebaseAPICalls';

type Props = {};

const RoomDetail = (props: Props) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [roomDetails, setRoomDetails] = useState<RoomDetailType>();
  const [refreshing, setRefreshing] = useState(false);
  const {roomId} = props.route.params;

  const {email, uid, displayName} = useSelector(
    (state: RootState) => state.auth.user,
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.heading}>
          Room Number {roomDetails?.roomNumber}
        </Text>
      ),
    });
  });

  useEffect(() => {
    getRoomDetail(roomId).then(res => {
      setRoomDetails(res?._data);
    });
  }, []);

  const onPressBookMeeting = () => {
    bookSlot(roomId, Number(selectedSlot.split('-')[0]), {
      id: uid,
      name: displayName,
      email: email,
    });
  };

  const onPullToRefresh = () => {
    setRefreshing(true);
    getRoomDetail(roomId).then(res => {
      setRoomDetails(res?._data);
      setRefreshing(false);
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
        data={roomDetails?.slots || ['', '', '', '', '']}
        renderItem={renderItems}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        onRefresh={onPullToRefresh}
        refreshing={refreshing}
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
