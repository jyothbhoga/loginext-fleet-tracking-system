import { Box, Chip, Typography } from "@mui/material";
import { useFetchVehicles } from "../../../customHooks/useFetchVehicles";
import { VEHICLE_LIST_URL } from "../../../common/config";
import { VehicleTable } from "./VehicleTable";
import { useAppSelector } from "../../../app/hooks";
import { selectVehiclesState } from "../../../app/vehicleReducer/vehicleSlice";

const VehicleListings = () => {
  useFetchVehicles(VEHICLE_LIST_URL);
  const { data, loading } = useAppSelector(selectVehiclesState);

  return (
    <Box sx={{ borderLeft: "1px solid rgba(0, 0, 0, 0.12)" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m="16px"
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Vehicles {!loading && <span>({data.length})</span>}
        </Typography>
        <Chip
          label="Live"
          size="small"
          sx={{
            border: "1px solid black",
            backgroundColor: "white",
          }}
        />
      </Box>

      <VehicleTable />
    </Box>
  );
};

export default VehicleListings;
