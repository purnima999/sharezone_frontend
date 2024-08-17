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
        uploadFilesRequest: () => { }
    },
});

const { actions, reducer } = shareZoneSlice;
export const {
    createZoneRequest,
    getZonesbyEmailIdRequest, getZonesbyEmailIdResponse,
    initiateCallRequest,
    uploadFilesRequest
} = actions;

export default reducer;