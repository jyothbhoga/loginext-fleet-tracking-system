// src/features/vehicles/vehiclesSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Vehicle } from "../../common/interface";

// Define the type for a single vehicle (assuming you have this)


// Define the slice's state structure
interface VehiclesState {
  data: Vehicle[];
  loading: boolean;
  error: string | null;
}

const initialState: VehiclesState = {
  data: [],
  loading: false,
  error: null,
};

export const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    // Action to initiate the fetch
    fetchVehiclesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Action for successful fetch
    fetchVehiclesSuccess: (state, action: PayloadAction<Vehicle[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    // Action for failed fetch
    fetchVehiclesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = []; // Clear data on failure
    },
    // You can add more reducers for local state updates (e.g., updateStatus)
  },
});

// Export the actions
export const {
  fetchVehiclesStart,
  fetchVehiclesSuccess,
  fetchVehiclesFailure,
} = vehiclesSlice.actions;

// Export the selector (to read state from the component)
export const selectVehiclesState = (state: RootState) => state.vehicles;

export default vehiclesSlice.reducer;
