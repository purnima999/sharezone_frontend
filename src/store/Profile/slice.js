import { createSlice } from '@reduxjs/toolkit';
import { getActionTypes } from '../../_mock/internalJsControl';

const initialState = {
    error: null,
    actionType: getActionTypes.UNSELECT,
    uploadedProfileImage: "",
    isConfirmModel: false
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addProfileImageRequest: (state, action) => {
            state.uploadedProfileImage = action.payload
        },
        profileDetailsAndProfileImageUpdateRequest: () => { },
        profileDetailsAndProfileImageUpdateResponse: (state, action) => {
            let { errorMessages } = action.payload;
            state.uploadedProfileImage = !errorMessages && ""
        },
        changeProfilePasswordRequest: () => { },
        changeProfilePasswordResponse: (state, action) => {
            state.error = action?.payload
        }
    },
});

export const {
    addProfileImageRequest,
    profileDetailsAndProfileImageUpdateRequest, profileDetailsAndProfileImageUpdateResponse,
    changeProfilePasswordRequest, changeProfilePasswordResponse

} = profileSlice.actions;

export default profileSlice.reducer;
