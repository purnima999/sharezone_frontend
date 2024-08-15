
import { createSlice } from '@reduxjs/toolkit';

const initialState = {

};

const registerSlice = createSlice({
    name: 'registerSlice',
    initialState,
    reducers: {
        registrationRequest: () => { }
    }
});


const { actions, reducer } = registerSlice

export const {
    registrationRequest, registrationResponse

} = actions;

export default reducer;
