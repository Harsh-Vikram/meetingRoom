import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import RoomCard from '../components/RoomCard';
import { IMAGES } from '../utils/images';
import { dummyRoomDetail } from '../utils/constants';

type Props = {};

const Home = (props: Props) => {
  const [data, setData] = useState();
  useEffect(() => {
    const readData = async () => {
      try {
        const users = await firestore().collection('Rooms') .orderBy('roomNumber', 'asc').get();
        users && setData(users?.docs)
        console.log('user', users?.docs)
      }
      catch (error) {
        console.log('error', error)
      }
      
    }
    readData()
  }, [])

// console.log('data',data);

  const onPressCard = () => {
  }
  const renderItem = ({item}) => {
    console.log('data',item);

    return (
      <View>
        <RoomCard
        imageName={IMAGES.ROOM_IMAGE}
        roomTitle='Room Number' 
        roomNumber={item?._data?.roomNumber}
        onPress={onPressCard}/>
      </View>
    );
  };

  return (
    <View style={{flex:1,paddingVertical:30}}>
        <View style={styles.card}>
          <FlatList
           columnWrapperStyle={{justifyContent:'space-around'}}
            data={data}
            renderItem={renderItem}
            numColumns={2}
            ItemSeparatorComponent={
              () => <View style={{ width: 400, height:50, }}/>
          }
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
