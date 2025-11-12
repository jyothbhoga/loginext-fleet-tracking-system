import {
  fetchStatisticsFailure,
  fetchStatisticsStart,
  fetchStatisticsSuccess,
} from "../../../app/statisticsReducer/statisticSlice";
import type { Statistic } from "../../../common/interface";
import type { Dispatch, Action } from "redux";

export async function fetchStatisticsApi(
  url: string,
  dispatch: Dispatch<Action>
): Promise<void> {
  dispatch(fetchStatisticsStart());

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const statisticData: Statistic = result.data;

    dispatch(fetchStatisticsSuccess(statisticData));
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred during fetch";

    dispatch(fetchStatisticsFailure(errorMessage));
  }
}
