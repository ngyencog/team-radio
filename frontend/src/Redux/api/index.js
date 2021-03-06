import { combineReducers } from 'redux';

import stations from './stations';
import currentStation from './currentStation';
import user from './user';
import visitor from './visitor';
import favouriteSongs from './favouriteSongs';

export default combineReducers({
  stations,
  currentStation,
  user,
  visitor,
  favouriteSongs,
});
