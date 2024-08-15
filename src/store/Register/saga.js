import { toast } from 'react-toastify';
import { call, takeLeading } from 'redux-saga/effects';
import { callAPI } from '../../_mock/internalJsControl';
import store from '../store';
import { setLoading } from '../UtilityCallFunction/slice';
import { registrationRequest } from './slice';

function* userRegistration(action) {
    console.log("accccccccccccccc", action)
    store.dispatch(setLoading(true))
    let { values, navigate } = action?.payload
    try {
        let response = yield call(callAPI, {
            url: 'http://127.0.0.1:3000/registation/',
            method: 'POST',
            data: values,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            navigate("/signin")
        toast(response?.message, {
            position: "top-right",
            type: response && response.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(setLoading(false))
}

function* watchRegisterSaga() {
    yield takeLeading(registrationRequest.type, userRegistration)
}

export default watchRegisterSaga;
