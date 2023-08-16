//Library imports
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

//Component imports
import RoomCard from '../../components/RoomCard';

//Util imports
import {IMAGES} from '../../utils/images';
import screenNames from '../../utils/screenNames';
import {getRooms} from '../../utils/FirebaseAPICalls';
import {RoomDetailType} from '../../utils/types';
import colors from '../../utils/colors';
import {vh, vw} from '../../utils/Dimension';

type Props = {};

const Home = (props: Props) => {
  const [data, setData] = useState(['', '', '', '', '', '']);
  useEffect(() => {
    const readData = async () => {
      const userData = await getRooms();
      if (userData) setData(userData?.map(item => item._data));
    };
    readData();
  }, []);

  const onPressCard = (roomDetails: RoomDetailType) => {
    props.navigation.navigate(screenNames.ROOM_DETAIL, roomDetails);
  };

  const renderItem = ({item}: {item: RoomDetailType}) => (
    <RoomCard
      imageName={IMAGES.ROOM_IMAGE}
      roomTitle="Room Number"
      roomNumber={item?.roomNumber}
      data={item}
      onPress={onPressCard}
    />
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={colors.PRIMARY_BG}
        barStyle={'dark-content'}
      />
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={data}
        renderItem={renderItem}
        numColumns={2}
        style={styles.flatListStyle}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BG,
  },
  flatListStyle: {
    paddingHorizontal: vw(20),
    marginTop: vh(30),
  },
  card: {
    height: '100%',
  },
});
