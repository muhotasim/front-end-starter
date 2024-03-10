import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user-store.store';
import uiSlice from './ui-store.store';

export const rootStore = configureStore({
  reducer: {
    users: userSlice,
    ui: uiSlice
  },
});


export type RootState = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch