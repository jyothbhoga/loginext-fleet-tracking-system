import { Box, Typography } from "@mui/material";
import { useFetchStatistics } from "../../../customHooks/useFetchStatistics";
import { STATISTICS_URL } from "../../../common/config";
import { useAppSelector } from "../../../app/hooks";
import { selectStatisticsState } from "../../../app/statisticsReducer/statisticSlice";
import { transfromFleetStatistics } from "../../../common/utils";
import StatisticCard from "./StatisticCard";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";

const VehicleStatistics = () => {
  useFetchStatistics(STATISTICS_URL);
  const { data, loading, error } = useAppSelector(selectStatisticsState);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <Typography variant="body1">Loading vehicles...</Typography>
      </Box>
    );
  }

  if (error) {
    return <div style={{ color: "red" }}>Error loading data: {error}</div>;
  }

  const statisticArr = data && transfromFleetStatistics(data);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          m: 2,
        }}
      >
        <WatchLaterOutlinedIcon
          sx={{
            color: "black",
            fontSize: "1rem",
            marginRight: "5px",
          }}
        />

        <Typography
          variant="subtitle2"
          component="span"
          sx={{ fontWeight: "bold", lineHeight: 1 }}
        >
          Fleet Statistics
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {statisticArr?.map((stat) => {
          return <StatisticCard {...stat} key={stat.id} />;
        })}
      </Box>
    </Box>
  );
};

export default VehicleStatistics;
