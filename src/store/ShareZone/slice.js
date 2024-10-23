import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

const shareZoneSlice = createSlice({
    name: 'shareZoneSlice',
    initialState,
    reducers: {
        createZoneRequest: () => { },
        getZonesbyEmailIdRequest: () => { },
        getZonesbyEmailIdResponse: (state, action) => {
            state.zoneData = action?.payload
        },
        initiateCallRequest: () => { },
        uploadFilesRequest: () => { },
        editZoneDetailsRequest: () => { },
        deleteZoneRequest: () => { },
        fetchUploadedFilesRequest: () => { },
        fetchUploadedFilesResponse: (state, action) => {
            state.uploadedFiles = action?.payload
        },
        deleteUploadedFilesRequest: () => { },
    },
});

const { actions, reducer } = shareZoneSlice;
export const {
    createZoneRequest,
    getZonesbyEmailIdRequest, getZonesbyEmailIdResponse,
    initiateCallRequest,
    uploadFilesRequest,
    editZoneDetailsRequest,
    deleteZoneRequest,
    fetchUploadedFilesRequest,
    fetchUploadedFilesResponse,
    deleteUploadedFilesRequest
} = actions;

export default reducer;