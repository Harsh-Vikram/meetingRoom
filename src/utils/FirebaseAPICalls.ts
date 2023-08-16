import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
export const getRooms = async () => {
  try {
    const users = await firestore()
      .collection('Rooms')
      .orderBy('roomNumber', 'asc')
      .get();
    if (users) {
      return users.docs;
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const bookSlot = async (
  id: string,
  index: number,
  occupiedBy: {
    id: string;
    name: string;
    email: string;
  },
) => {
  try {
    const data = await firestore().collection('Rooms').doc(id).get();

    if (data) {
      console.log('=-=-=-=-', id, data, data._data.slots[index].isOccupied);
      if (data._data.slots[index].isOccupied) {
        Alert.alert('Slot already booked');
      } else {
        let tempData = [...data._data.slots];
        tempData[index].isOccupied = true;
        tempData[index].occupiedBy = occupiedBy;

        console.log('tempData', tempData);
        firestore()
          .collection('Rooms')
          .doc(id)
          .update({
            slots: tempData,
          })
          .then(res => {
            console.log('res', res);
          })
          .catch(err => {
            console.log('err', err);
          });
      }

      // return users.docs;
    }
  } catch (error) {
    console.log('error', error);
  }
};
