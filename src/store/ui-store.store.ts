import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiStateInterface } from '../utils/common.interfaces';

const initialState: UiStateInterface = {
    theme: 'default',
    themeList: [ 'default' ]
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<{theme: string}>) => {
            return { ...state, theme: action.payload.theme };
        },
    }
});

export const { setTheme } = uiSlice.actions;

export default uiSlice.reducer;
