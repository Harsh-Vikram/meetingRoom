import firestore from '@react-native-firebase/firestore';
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
