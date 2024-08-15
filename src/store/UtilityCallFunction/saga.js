
import { toast } from 'react-toastify';
import { call, put, takeLeading } from 'redux-saga/effects';
import { callAPI } from '../../_mock/internalJsControl';
import store from '../store';
import {
    getAssetsRequest,
    getAssetsResponse,
    getPatientDetailsRequest,
    getPatientDetailsResponse,
    setLoading
} from './slice';

// TO GET PATIENT DETAILS
function* getPatientDetails(action) {
    let profileDetails = ""
    try {
        const response = yield call(callAPI, {
            url: '/userdetails',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            profileDetails = response?.data
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }

    yield put(getPatientDetailsResponse(profileDetails))
}

// TO GET THE ASSETS
function* getAssetsFile(action) {
    store.dispatch(setLoading(true))
    let key = action?.payload?.split(".")?.[0];
    let asset;

    let reqObj = {
        filename: action?.payload
    }
    try {
        const response = yield call(callAPI, {
            url: '/get-asset-url',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log(`getAssetsFile=>`, response)
        if (response?.status && response?.statuscode === 200 && response?.data) {
            asset = {
                [key]: response?.data?.asset_url
            }
        }
    } catch (error) {
    }

    yield put(getAssetsResponse(asset))
    store.dispatch(setLoading(false))
}

function* watchUtilityCallFunctionSaga() {
    yield takeLeading(getPatientDetailsRequest.type, getPatientDetails);
    yield takeLeading(getAssetsRequest.type, getAssetsFile)
}

export default watchUtilityCallFunctionSaga;