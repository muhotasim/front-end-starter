import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateInterface } from '../utils/common.interfaces';

const initialState: UserStateInterface = {
    token: null,
    refetshToken: null,
    name: '',
    email: '',
    permissions: [],
    loggedIn: true
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserStateInterface>) => {
            return { ...state, ...action.payload };
        },
        logout: (state) => {
            return { ...state, ...initialState }; // reseting to initial state
        },
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
