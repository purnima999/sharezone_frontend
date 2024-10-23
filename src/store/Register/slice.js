
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
        },
        setIsAuthUserRequest: (state, action) => {
            state.isAuthUser = action?.payload
        }
    }
});


const { actions, reducer } = registerSlice

export const {
    registrationRequest, registrationResponse,
    signinRequest, signinResponse,
    setIsAuthUserRequest

} = actions;

export default reducer;
