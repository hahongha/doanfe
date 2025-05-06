import { combineReducers } from 'redux';
import userReducer from './userReducer';
import roleReducer from './roleReducer';
import authorityReducer from './authorityReducer';
import roomTypeReducer from './roomTypeReducer';
import roomReducer from './roomReducer';
import renterReducer from './renterReducer';
import contractReducer from './contractReducer';
import contractMemberReducer from './contractMemberReducer';
import serviceReducer from './serviceReducer';
import imageReducer from './imageReducer';
import authReducer from './authReducer';
import EWReducer from './EWReducer';
import roomServiceReducer from './roomServiceReducer';
import roomReturnReducer from './roomReturnReducer';
import billReducer from './billReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  role: roleReducer,
  authority: authorityReducer,
  roomType: roomTypeReducer,
  room: roomReducer,
  renter: renterReducer,
  contract: contractReducer,
  contractMember: contractMemberReducer,
  service: serviceReducer,
  file: imageReducer,
  ew: EWReducer,
  roomService: roomServiceReducer,
  roomReturn: roomReturnReducer,
  bill: billReducer,
});

export default RootReducer;
