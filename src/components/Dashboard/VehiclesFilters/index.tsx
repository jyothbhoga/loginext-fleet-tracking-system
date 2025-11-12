import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { selectStatisticsState } from "../../../app/statisticsReducer/statisticSlice";
import { transformFilters } from "../../../common/utils";
import FilterCard from "./FilterCard";
import { useState } from "react";
import { useFetchVehicles } from "../../../customHooks/useFetchVehicles";
import {
  VEHICLE_LIST_BY_STATUS_URL,
  VEHICLE_LIST_URL,
} from "../../../common/config";
import WifiIcon from "@mui/icons-material/Wifi";
import FilterIcon from "@mui/icons-material/FilterAlt";
import { useWebSocketVehicles } from "../../../customHooks/useWebsocketVehicles";

const VehicleFilters = () => {
  const { data, loading, error } = useAppSelector(selectStatisticsState);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const [fetchUrl, setFetchUrl] = useState(VEHICLE_LIST_URL);

  useWebSocketVehicles();

  useFetchVehicles(fetchUrl);

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
        <Typography variant="body1">Loading Filters...</Typography>
      </Box>
    );
  }

  if (error) {
    return <div style={{ color: "red" }}>Error loading filters: {error}</div>;
  }

  const filters = data && transformFilters(data);

  const selectFilter = (id: string) => {
    setSelectedFilter(id);

    const newUrl =
      id === "all"
        ? VEHICLE_LIST_URL
        : VEHICLE_LIST_BY_STATUS_URL.replace("{{status}}", id);

    setFetchUrl(newUrl);
  };
  return (
    <Box>
      <Button
        sx={{
          border: "1px solid lightgray",
          borderRadius: "10px",
          width: "100%",
          textTransform: "capitalize",
          color: "green",
        }}
      >
        <WifiIcon
          sx={{ color: "#28a745", fontSize: "large", paddingRight: "10px" }}
        />{" "}
        Live Updates Active
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: "20px",
        }}
      >
        <FilterIcon
          sx={{
            color: "black",
            fontSize: "1rem",
            marginRight: "5px",
          }}
        />
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "bold", lineHeight: 1 }}
        >
          Filter By Status
        </Typography>
      </Box>
      <Box
        mt="20px"
        mb="20px"
        sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
      >
        {filters?.map((stat) => {
          return (
            <FilterCard
              filter={stat}
              key={stat.id}
              selectFilter={selectFilter}
              selectedFilter={selectedFilter}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default VehicleFilters;
