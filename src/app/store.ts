import { configureStore } from "@reduxjs/toolkit";
import vehiclesReducer from "./vehiclesReducer/vehiclesSlice";
import statisticReducer from "./statisticsReducer/statisticSlice";
import modalReducer from "./modalReducer/modalSlice";
import singleVehicleSlice from "./singleVehicleReducer/singleVehicleSlice";

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    statistics: statisticReducer,
    modals: modalReducer,
    singleVehicle: singleVehicleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
