
import { toast } from 'react-toastify';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { callAPI, getActionTypes } from '../../_mock/internalJsControl';
import store from '../store';
import { setActionTypeAndActionData, setLoading } from '../UtilityCallFunction/slice';
import { createZoneRequest, getZonesbyEmailIdResponse, getZonesbyEmailIdRequest } from './slice';


function* getZones(action) {
    store.dispatch(setLoading(true))
    let url = 'http://127.0.0.1:8000/get_zones/{email}';
    let zonesData = "";
    const { userDetails } = yield select(state => state.registerSlice);

    // let email = action || userDetails?.email
    let email = "ravi@gmail.com";

    try {
        let response = yield call(callAPI, {
            url: url?.replace("{email}", email),
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            zonesData = response?.data
        toast(response?.message, {
            position: "top-right",
            type: response && response.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.response?.message, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(getZonesbyEmailIdResponse(zonesData))
    store.dispatch(setLoading(false))
}

function* crateZone(action) {
    store.dispatch(setLoading(true))
    let { values } = action?.payload

    const { userDetails } = yield select(state => state.registerSlice);

    let reqObj = {
        roomname: values?.roomname,
        email: "ravi@gmail.com"
        // email: userDetails?.email
    }
    try {
        let response = yield call(callAPI, {
            url: 'http://127.0.0.1:8000/create_zone/',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 201) {
            store.dispatch(setActionTypeAndActionData(getActionTypes.UNSELECT))
            yield call(getZones, "ravi@gmail.com")
        }
        toast(response?.message, {
            position: "top-right",
            type: response && response.status && response?.statuscode === 201 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.response?.message, {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(setLoading(false))
}

function* watchShareZoneSaga() {
    yield takeLeading(getZonesbyEmailIdRequest.type, getZones)
    yield takeLeading(createZoneRequest.type, crateZone)
}

export default watchShareZoneSaga;