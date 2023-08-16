import {createAction} from '@reduxjs/toolkit';
import actionNames from '../../utils/actionNames';
export const saveUserData = createAction<{user: object}>(
  actionNames.SAVE_USER_DATA,
);
