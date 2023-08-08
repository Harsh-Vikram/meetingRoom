import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import RoomCard from '../components/RoomCard';
import {IMAGES} from '../utils/images';

type Props = {};

const Home = (props: Props) => {
  const [data, setData] = useState();
  useEffect(() => {
    const readData = async () => {
      try {
        const users = await firestore().collection('Rooms').get();
        users && setData(users?.docs);
        console.log('user', users?.docs);
      } catch (error) {
        console.log('error', error);
      }
    };
    readData();
  }, []);

  const onPressCard = () => {};
  const renderItem = (data: any) => {
    return (
      <View>
        <RoomCard
          imageName={IMAGES.ROOM_IMAGE}
          roomTitle="Room Number"
          roomNumber="101"
          onPress={onPressCard}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Text>Home</Text>
      <View style={styles.card}>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-around'}}
          data={['', '', '', '', '', '', '']}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{alignItems: 'center'}}
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
