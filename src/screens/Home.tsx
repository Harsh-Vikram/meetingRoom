//Library imports
import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

//Component imports
import RoomCard from '../components/RoomCard';

//Util imports
import {IMAGES} from '../utils/images';
import screenNames from '../utils/screenNames';
import {getRooms} from '../utils/FirebaseAPICalls';
import {RoomDetailType} from '../utils/types';

type Props = {};

const Home = (props: Props) => {
  const [data, setData] = useState();
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

  console.log(data);

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
    <View style={{flex: 1, paddingVertical: 30}}>
      <View style={styles.card}>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-around'}}
          data={data}
          renderItem={renderItem}
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View style={{width: 400, height: 50}} />
          )}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  card: {
    height: '100%',
  },
});
