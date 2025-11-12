import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./vehicleReducer/vehicleSlice";

export const store = configureStore({
  reducer: {
    counter: vehicleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
