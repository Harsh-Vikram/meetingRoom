//Library imports
import {useSelector} from 'react-redux';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

//Component imports
import SlotCard from '../../components/SlotCard';
import Button from '../../components/Button';

//Util imports
import colors from '../../utils/colors';
import {RootState} from '../../store';
import {normalize, vh, vw} from '../../utils/Dimension';
import {RoomDetailType, SlotDataType} from '../../utils/types';
import {bookSlot, getRoomDetail} from '../../utils/FirebaseAPICalls';
import {AlertModal} from '../../components/AlertModal';

type Props = {};

const RoomDetail = (props: Props) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [roomDetails, setRoomDetails] = useState<RoomDetailType>();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {roomId} = props.route.params;
  const modalRef = useRef<{
    toggleModal: () => void;
  }>();

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
    setIsLoading(true);
    bookSlot(
      roomId,
      Number(selectedSlot.split('-')[0]),
      {
        id: uid,
        name: displayName,
        email: email,
      },
      () => {
        setIsLoading(false);
        setSelectedSlot('');
        getRoomDetail(roomId).then(res => {
          setRoomDetails(res?._data);
        });
        modalRef.current?.toggleModal();
      },
    );
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
      <AlertModal
        ref={modalRef}
        msg="Room booked successfully."
        heading="Success"
        rightBtnText="Okay"
        onRightBtnPress={() => {
          modalRef.current?.toggleModal();
        }}
      />
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
        isLoading={isLoading}
        containerStyle={styles.btnContainer}
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
  btnContainer: {
    margin: vw(20),
    width: '90%',
    alignSelf: 'center',
  },
});
