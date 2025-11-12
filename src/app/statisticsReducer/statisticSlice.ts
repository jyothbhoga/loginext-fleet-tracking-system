import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Statistic } from "../../common/interface";


interface StatisticsState {
  data: Statistic | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  data: null,
  loading: false,
  error: null,
};

export const statisticsSlice = createSlice({
  name: "Statistics",
  initialState,
  reducers: {
    fetchStatisticsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess: (state, action: PayloadAction<Statistic>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null; 
    },
  },
});

export const {
  fetchStatisticsStart,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} = statisticsSlice.actions;

export const selectStatisticsState = (state: RootState) => state.statistics;

export default statisticsSlice.reducer;
