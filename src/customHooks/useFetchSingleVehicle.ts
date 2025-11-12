import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  fetchSingleVehicleFailure,
  fetchSingleVehicleStart,
  fetchSingleVehicleSuccess,
} from "../app/singleVehicleReducer/singleVehicleSlice";
import { VEHICLE_LIST_URL } from "../common/config";

export function useFetchSingleVehicle(url: string) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      dispatch(fetchSingleVehicleStart());

      try {
        const response = await fetch(`${VEHICLE_LIST_URL}/${url}`, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        dispatch(fetchSingleVehicleSuccess(result.data));
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") {
          return;
        }

        const errorMessage =
          e instanceof Error ? e.message : "An unknown error occurred";

        dispatch(fetchSingleVehicleFailure(errorMessage));
      }
    };
    
    if (url) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [url, dispatch]);
}
