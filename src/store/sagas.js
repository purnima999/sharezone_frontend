import { all } from 'redux-saga/effects';
import watchRegisterSaga from './Register/saga';
import watchUtilityCallFunctionSaga from './UtilityCallFunction/saga';

function* rootSaga() {
  yield all([
    watchUtilityCallFunctionSaga(),
    watchRegisterSaga()
  ]);
}

export default rootSaga;
