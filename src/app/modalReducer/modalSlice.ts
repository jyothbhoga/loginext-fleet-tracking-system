// src/app/modalReducer/modalSlice.ts

import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface VehicleModalState {
  isOpen: boolean;
  vehicleId: string | null; 
}

const initialState: VehicleModalState = {
  isOpen: false,
  vehicleId: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openVehicleModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.vehicleId = action.payload; 
    },
    closeVehicleModal: (state) => {
      state.isOpen = false;
      state.vehicleId = null; 
    },
  },
});

export const { openVehicleModal, closeVehicleModal } = modalSlice.actions;

export const selectVehicleModalState = (state: RootState) => state.modals;

export default modalSlice.reducer;