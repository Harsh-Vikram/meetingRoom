import screenNames from './screenNames';
export type SlotDataType = {
  startTime: string;
  endTime: string;
  isOccupied: boolean;
};

export type RoomDetailType = {
  roomId: string;
  roomNumber: string;
  slots: SlotDataType[];
};

export type MainStackParams = {
  [screenNames.HOME]: undefined;
  [screenNames.ROOM_DETAIL]: undefined;
};
