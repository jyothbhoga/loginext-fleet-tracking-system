import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  fetchStatisticsFailure,
  fetchStatisticsStart,
  fetchStatisticsSuccess,
} from "../app/statisticsReducer/statisticSlice";

export function useFetchStatistics(url: string) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      dispatch(fetchStatisticsStart());

      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        dispatch(fetchStatisticsSuccess(result.data));
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") {
          return;
        }

        const errorMessage =
          e instanceof Error ? e.message : "An unknown error occurred";

        dispatch(fetchStatisticsFailure(errorMessage));
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
