import { combineReducers } from '@reduxjs/toolkit';
import profileSlice from './Profile/slice';
import registerSlice from "./Register/slice";
import shareZoneSlice from './ShareZone/slice';
import utilityCallFunctionSlice from './UtilityCallFunction/slice';

const rootReducer = combineReducers({
  utilityCallFunctionSlice,
  profileSlice,
  registerSlice,
  shareZoneSlice
});

export default rootReducer;