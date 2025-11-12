import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Vehicle } from "../../common/interface";

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
    fetchVehiclesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVehiclesSuccess: (state, action: PayloadAction<Vehicle[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchVehiclesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const {
  fetchVehiclesStart,
  fetchVehiclesSuccess,
  fetchVehiclesFailure,
} = vehiclesSlice.actions;

export const selectVehiclesState = (state: RootState) => state.vehicles;

export default vehiclesSlice.reducer;
