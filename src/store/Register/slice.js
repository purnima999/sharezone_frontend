
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthUser: false
};

const registerSlice = createSlice({
    name: 'registerSlice',
    initialState,
    reducers: {
        registrationRequest: () => { },
        signinRequest: () => { },
        signinResponse: (state, action) => {
            state.isAuthUser = action?.payload?.isAuthUser
            state.userDetails = action?.payload?.userDetails
        }
    }
});


const { actions, reducer } = registerSlice

export const {
    registrationRequest, registrationResponse,
    signinRequest, signinResponse

} = actions;

export default reducer;
