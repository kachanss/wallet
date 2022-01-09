import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../../store/redux';

interface SystemState {
  appInitialized: boolean; // App initialization
}

const initialState: SystemState = {
  appInitialized: false,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setInitialized: state => {
      state.appInitialized = true;
    },
  },
});

export const {setInitialized} = systemSlice.actions;

export const selectIsInitialized = (state: RootState) =>
  state.system.appInitialized;

export default systemSlice.reducer;
