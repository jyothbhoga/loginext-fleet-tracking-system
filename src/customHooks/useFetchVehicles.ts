import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  fetchVehiclesFailure,
  fetchVehiclesStart,
  fetchVehiclesSuccess,
} from "../app/vehiclesReducer/vehicleSlice";

export function useFetchVehicles(url: string) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      dispatch(fetchVehiclesStart());

      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        dispatch(fetchVehiclesSuccess(result.data));
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") {
          return;
        }

        const errorMessage =
          e instanceof Error ? e.message : "An unknown error occurred";

        dispatch(fetchVehiclesFailure(errorMessage));
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, dispatch]);
}
