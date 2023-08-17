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
export const getRoomDetail = async (id: string) => {
  try {
    const users = await firestore().collection('Rooms').doc(id).get();
    if (users) {
      return users;
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
  successCallback?: () => void,
  errorCallback?: (err: string) => void,
) => {
  try {
    const data = await firestore().collection('Rooms').doc(id).get();
    if (data) {
      if (data._data.slots[index].isOccupied) {
        errorCallback?.("Slot already booked")
      } else {
        let tempData = [...data._data.slots];
        tempData[index].isOccupied = true;
        tempData[index].occupiedBy = occupiedBy;
        firestore()
          .collection('Rooms')
          .doc(id)
          .update({
            slots: tempData,
          })
          .then(successCallback)
          .catch(errorCallback);
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};
