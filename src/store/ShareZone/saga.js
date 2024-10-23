
import { toast } from 'react-toastify';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { callAPI, getActionTypes } from '../../_mock/internalJsControl';
import store from '../store';
import { setActionTypeAndActionData, setLoading } from '../UtilityCallFunction/slice';
import { createZoneRequest, getZonesbyEmailIdResponse, getZonesbyEmailIdRequest, initiateCallRequest, uploadFilesRequest, editZoneDetailsRequest, deleteZoneRequest, fetchUploadedFilesRequest, deleteUploadedFilesRequest, fetchUploadedFilesResponse } from './slice';


function* getZones(action) {
    store.dispatch(setLoading(true))
    let url = 'http://127.0.0.1:8000/get_zones/{email}';
    let zonesData = "";
    const userDetails = yield select(state => state.registerSlice?.userDetails);

    let email = userDetails?.email

    try {
        let response = yield call(callAPI, {
            url: url?.replace("{email}", email),
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            zonesData = response?.data
        else
            toast(response?.message, {
                position: "top-right",
                type: "error",
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
        email: userDetails?.email
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
            yield call(getZones)
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

// Video call initiation saga
function* initiateCall(action) {
    store.dispatch(setLoading(true));
    const { email } = action.payload;

    try {
        let response = yield call(callAPI, {
            url: `http://127.0.0.1:8000/initiate-call/`,
            method: 'POST',
            data: { email },
            contentType: 'application/json',
        });

        if (response?.status && response?.statuscode === 200) {
            toast(response?.message, {
                position: "top-right",
                type: "success",
            });
        } else {
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
        }
    } catch (error) {
        toast(error?.response?.message || 'Failed to initiate call', {
            position: "top-right",
            type: "error",
        });
    }
    yield
    store.dispatch(setLoading(false));
}

// File upload saga
function* uploadFile(action) {
    store.dispatch(setLoading(true));
    let { filename, roomname } = action?.payload;

    try {
        let response = yield call(callAPI, {
            url: `http://127.0.0.1:8000/upload/?roomname=${encodeURIComponent(roomname)}`,
            method: 'POST',
            data: filename,
        });

        if (response?.status) {
            toast.success('File uploaded successfully');
            store.dispatch(fetchUploadedFilesRequest(roomname));
        } else {
            toast.error(response?.message || 'Failed to upload file');
        }
    } catch (error) {
        toast.error('Error uploading file');
    } finally {
        store.dispatch(setLoading(true));
    }
};

// to fetch uploaded files
function* fetchUploadedFiles(action) {
    store.dispatch(setLoading(true));
    let uploadedFiles = [];

    try {
        let response = yield call(callAPI, {
            url: `http://127.0.0.1:8000/files/${action?.payload}`,
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200) {
            uploadedFiles = response.data
        } else {
            toast.error('Failed to fetch files');
        }
    } catch (error) {
        toast.error('Error fetching files');
    }
    yield put(fetchUploadedFilesResponse(uploadedFiles));
    store.dispatch(setLoading(false));
};

// to delete uploaded files
export const deleteFile = (filename, roomname) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await callAPI({
            url: `http://127.0.0.1:8000/files/${filename}/?roomname=${encodeURIComponent(roomname)}`,
            method: 'DELETE',
        });

        if (response?.status) {
            toast.success('File deleted successfully');
            dispatch(fetchUploadedFiles(roomname)); // Refresh file list
        } else {
            toast.error('Failed to delete file');
        }
    } catch (error) {
        toast.error('Error deleting file');
    } finally {
        dispatch(setLoading(false));
    }
};

// to edit the zone details 
function* editZoneDetails(action) {
    store.dispatch(setLoading(true))
    let { values, zoneid } = action?.payload
    let url = 'http://127.0.0.1:8000/edit_zone/{zone_id}';

    const { userDetails } = yield select(state => state.registerSlice);

    let reqObj = {
        roomname: values?.roomname,
        email: userDetails?.email
    }
    try {
        let response = yield call(callAPI, {
            url: url?.replace("{zone_id}", zoneid),
            method: 'PUT',
            data: reqObj,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200) {
            store.dispatch(setActionTypeAndActionData(getActionTypes.UNSELECT))
            yield call(getZones)
        }
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
    store.dispatch(setLoading(false))
}


// delete zone 
function* deleteZoneById(action) {
    store.dispatch(setLoading(true))
    let url = 'http://127.0.0.1:8000/delete_zone/{zone_id}';

    try {
        let response = yield call(callAPI, {
            url: url?.replace("{zone_id}", action?.payload),
            method: 'DELETE',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200) {
            store.dispatch(setActionTypeAndActionData(getActionTypes.UNSELECT))
            yield call(getZones)
        }
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
    store.dispatch(setLoading(false))
}

function* watchShareZoneSaga() {
    yield takeLeading(getZonesbyEmailIdRequest.type, getZones)
    yield takeLeading(createZoneRequest.type, crateZone)
    yield takeLeading(initiateCallRequest.type, initiateCall)
    yield takeLeading(uploadFilesRequest.type, uploadFile);
    yield takeLeading(editZoneDetailsRequest.type, editZoneDetails);
    yield takeLeading(deleteZoneRequest.type, deleteZoneById);
    yield takeLeading(fetchUploadedFilesRequest.type, fetchUploadedFiles);
    yield takeLeading(deleteUploadedFilesRequest.type, deleteFile);
}

export default watchShareZoneSaga;