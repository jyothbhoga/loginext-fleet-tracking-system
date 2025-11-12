import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { selectStatisticsState } from "../../../app/statisticsReducer/statisticSlice";
import {
  getRealTimeUpdates,
  transfromFleetStatistics,
} from "../../../common/utils";
import StatisticCard from "./StatisticCard";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import { selectVehiclesState } from "../../../app/vehiclesReducer/vehiclesSlice";

const VehicleStatistics = () => {
  const { data, loading, error } = useAppSelector(selectStatisticsState);

  const {data:vehicleData} = useAppSelector(selectVehiclesState)

  if (error) {
    return <div style={{ color: "red" }}>Error loading data: {error}</div>;
  }

  const statisticArr = data && transfromFleetStatistics(data, vehicleData[0]?.lastUpdated);

  const { lastUpdated, nextUpdate } = getRealTimeUpdates(vehicleData[0]?.lastUpdated || "");

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
      {(loading || !data) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Typography variant="body1">Loading statistics...</Typography>
        </Box>
      )}
      {data && (
        <Box
          sx={{
            backgroundColor: "lightgray",
            padding: "5px 10px",
            borderRadius: "6px",
            mt: "20px",
          }}
        >
          <Typography>{`Updated ${lastUpdated} • Next update ${nextUpdate}`}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default VehicleStatistics;
