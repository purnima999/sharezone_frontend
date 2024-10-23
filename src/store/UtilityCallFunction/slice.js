import { createSlice } from '@reduxjs/toolkit';
import { getActionTypes } from '../../_mock/internalJsControl';
import femaleuserImg from "../../images/femaleuserImg.jpg";
import maleuserImg from "../../images/userprofile.jpg";

const initialState = {
    getProfileDetails: "",
    profilePicture: "",
    confirmationData: null,
    isLoading: false,
    actionData: "",
    actionType: getActionTypes.UNSELECT,
    assetUrl: "",
    ischatBotLoading: false
};

const utilityCallFunctionSlice = createSlice({
    name: 'utilityCallFunctionSlice',
    initialState,
    reducers: {
        setActionTypeAndActionData: (state, action) => {
            state.actionType = action.payload?.actionType;
            state.actionData = action.payload?.actionData;
        },
        getPatientDetailsRequest: (state) => {
            state.isLoading = true;
        },
        getPatientDetailsResponse: (state, action) => {
            state = {
                ...state,
                getProfileDetails: action.payload,
                profilePicture: ((action.payload?.profile_url === "NA") ? (action.payload.gender?.toLowerCase() === "female" ? femaleuserImg : maleuserImg) : action.payload?.profile_url),
                isLoading: false
            }
            return state
        },
        setConfirmationOpen: (state, action) => {
            state.confirmationData = action.payload
        },
        setConfirmationClose: (state, action) => {
            state.confirmationData = null
        },
        setLoading: (state, action) => {
            state.isLoading = action?.payload
        },
        getAssetsRequest: () => { },
        getAssetsResponse: (state, action) => {
            state.assetUrl = action.payload
        }
    },
});

const { actions, reducer } = utilityCallFunctionSlice;
export const {
    setLoading,
    setActionTypeAndActionData,
    setConfirmationOpen, setConfirmationClose,
    getPatientDetailsRequest, getPatientDetailsResponse,
    getAssetsRequest, getAssetsResponse
} = actions;

export default reducer;