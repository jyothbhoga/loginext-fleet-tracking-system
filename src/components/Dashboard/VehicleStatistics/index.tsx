import { Box, Typography } from "@mui/material";
import { useFetchStatistics } from "../../../customHooks/useFetchStatistics";
import { STATISTICS_URL } from "../../../common/config";
import { useAppSelector } from "../../../app/hooks";
import { selectStatisticsState } from "../../../app/statisticsReducer/statisticSlice";
import { transfromFleetStatistics } from "../../../common/utils";
import StatisticCard from "./StatisticCard";

const VehicleStatistics = () => {
  useFetchStatistics(STATISTICS_URL);
  const { data, loading, error } = useAppSelector(selectStatisticsState);

  if (loading) {
    return <div>Loading vehicles...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error loading data: {error}</div>;
  }

  const statisticArr = data && transfromFleetStatistics(data);

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", m: 2 }}>
        Fleet Statistics
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {statisticArr?.map((stat) => {
          return <StatisticCard {...stat} key={stat.id} />;
        })}
      </Box>
    </Box>
  );
};

export default VehicleStatistics;
