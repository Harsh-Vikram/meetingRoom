import screenNames from './screenNames';

export type OccupiedByType = {
  id: string;
  name: string;
  email: string;
};
export type SlotDataType = {
  startTime: string;
  endTime: string;
  isOccupied: boolean;
  occupiedBy?: OccupiedByType;
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
