import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./vehiclesReducer/vehicleSlice";
import statisticReducer from "./statisticsReducer/statisticSlice";
import modalReducer from "./modalReducer/modalSlice";

export const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    statistics: statisticReducer,
    modals: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
