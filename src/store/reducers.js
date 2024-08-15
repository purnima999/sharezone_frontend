import { combineReducers } from '@reduxjs/toolkit';
import profileSlice from './Profile/slice';
import registerSlice from "./Register/slice";
import utilityCallFunctionSlice from './UtilityCallFunction/slice';

const rootReducer = combineReducers({
  utilityCallFunctionSlice,
  profileSlice,
  registerSlice
});

export default rootReducer;