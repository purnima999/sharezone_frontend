import { all } from 'redux-saga/effects';
import watchRegisterSaga from './Register/saga';
import watchShareZoneSaga from './ShareZone/saga';
import watchUtilityCallFunctionSaga from './UtilityCallFunction/saga';

function* rootSaga() {
  yield all([
    watchUtilityCallFunctionSaga(),
    watchRegisterSaga(),
    watchShareZoneSaga()
  ]);
}

export default rootSaga;
