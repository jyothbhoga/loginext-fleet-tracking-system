import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Vehicle } from "../../common/interface";

interface VehicleState {
  data: Vehicle | null;
  loading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  data: null,
  loading: false,
  error: null,
};

export const singleVehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    fetchSingleVehicleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSingleVehicleSuccess: (state, action: PayloadAction<Vehicle>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchSingleVehicleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const {
  fetchSingleVehicleStart,
  fetchSingleVehicleSuccess,
  fetchSingleVehicleFailure,
} = singleVehicleSlice.actions;

export const selectSingleVehicleState = (state: RootState) => state.singleVehicle;

export default singleVehicleSlice.reducer;
