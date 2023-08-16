import {createReducer} from '@reduxjs/toolkit';
import {AuthState, HomeState} from '../../modal';
import actionNames from '../../utils/actionNames';
import {SlotDataType} from '../../utils/types';

export interface HomeStateType {
  rooms: {
    roomNumber: number;
    roomId: string;
    slots: SlotDataType[];
    displayName: string;
    uid: string;
  }[];
}
const homeInitialState: HomeStateType = new HomeState();

const homeReducer = createReducer(homeInitialState, builder => {
  builder.addCase(
    actionNames.SAVE_USER_DATA,
    (state, action: {type: string; payload: any}) => {
      state.rooms = action.payload;
      return state;
    },
  );
});

export default homeReducer;
