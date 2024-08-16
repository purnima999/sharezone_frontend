import { toast } from 'react-toastify';
import { call, takeLeading, put } from 'redux-saga/effects';
import { callAPI } from '../../_mock/internalJsControl';
import store from '../store';
import { setLoading } from '../UtilityCallFunction/slice';
import { registrationRequest, signinRequest, signinResponse } from './slice';

function* userRegistration(action) {
    store.dispatch(setLoading(true))
    let { values, navigate } = action?.payload
    let reqObj = {
        username: values?.username,
        email: values?.email,
        password: values?.password
    }
    try {
        let response = yield call(callAPI, {
            url: 'http://127.0.0.1:8000/register/',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 201)
            navigate("/signin")
        toast(response?.message, {
            position: "top-right",
            type: response && response.status && response?.statuscode === 201 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(setLoading(false))
}

function* userSignin(action) {
    store.dispatch(setLoading(true))
    let { values, navigate } = action?.payload;
    let isAuthUser = false
    let userDetails = "";

    let reqObj = {
        username: values?.username,
        password: values?.password
    }
    try {
        let response = yield call(callAPI, {
            url: 'http://127.0.0.1:8000/login/',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log("response=>", response)
        if (response?.status && response?.statuscode === 200) {
            navigate("/dashboard")
            isAuthUser = true
            userDetails = response?.data
        }
        toast(response?.message, {
            position: "top-right",
            type: response.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(signinResponse({isAuthUser, userDetails}))
    store.dispatch(setLoading(false))
}

function* watchRegisterSaga() {
    yield takeLeading(registrationRequest.type, userRegistration)
    yield takeLeading(signinRequest.type, userSignin)
}

export default watchRegisterSaga;
