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

const VehicleFilters = () => {
  const { data, loading, error } = useAppSelector(selectStatisticsState);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const [fetchUrl, setFetchUrl] = useState(VEHICLE_LIST_URL);

  useFetchVehicles(fetchUrl);

  if (loading) {
    return <div>Loading filters...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>Error loading filters: {error}</div>
    );
  }

  const filters = data && transformFilters(data);

  const selectFilter = (id: string) => {
    setSelectedFilter(id);

    const newUrl =
      id === "total"
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
        Live Updates Active
      </Button>
      <Typography mt="20px">Filter By Status</Typography>
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
