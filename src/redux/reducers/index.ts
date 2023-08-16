import authReducer from '../../modules/Auth/authReducer';
import homeReducer from '../../modules/Home/homeReducer';

const rootReducers = {
  auth: authReducer,
  home: homeReducer,
};

export default rootReducers;
