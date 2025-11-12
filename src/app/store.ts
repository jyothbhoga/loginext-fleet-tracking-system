import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./vehicleReducer/vehicleSlice";
import statisticReducer from "./statisticsReducer/statisticSlice";

export const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    statistics: statisticReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
