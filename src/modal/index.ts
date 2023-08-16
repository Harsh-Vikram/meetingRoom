import {HomeStateType} from '../modules/Home';
import {SlotDataType} from '../utils/types';

export class AuthState {
  user: {
    isUserLoggedIn: boolean;
    email: string;
    password: string;
    displayName: string;
    uid: string;
  } = {
    isUserLoggedIn: false,
    email: '',
    password: '',
    displayName: '',
    uid: '',
  };
}

export class HomeState {
  rooms: {
    roomNumber: number;
    roomId: string;
    slots: SlotDataType[];
    displayName: string;
    uid: string;
  }[] = [];
}
