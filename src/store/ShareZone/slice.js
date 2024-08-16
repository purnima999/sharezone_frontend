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
        }
    },
});

const { actions, reducer } = shareZoneSlice;
export const {
    createZoneRequest,
    getZonesbyEmailIdRequest, getZonesbyEmailIdResponse
} = actions;

export default reducer;