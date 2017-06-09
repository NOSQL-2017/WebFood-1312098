import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import images from './reducers/images'

export default combineReducers({
  flashMessages,
  images,
  auth
});
