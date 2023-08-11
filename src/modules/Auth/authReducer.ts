import {createReducer} from '@reduxjs/toolkit';
import {AuthState} from '../../modal';
import actionNames from '../../utils/actionNames';

export interface AuthStateType {
  user: {
    isUserLoggedIn: boolean;
    email: string;
    password: string;
    displayName: string;
    uid: string;
  };
}
const authInitialState: AuthStateType = new AuthState();

const authReducer = createReducer(authInitialState, builder => {
  builder.addCase(
    actionNames.SAVE_USER_DATA,
    (state, action: {type: string; payload: any}) => {
      state.user = action.payload;
      return state;
    },
  );
});

export default authReducer;
