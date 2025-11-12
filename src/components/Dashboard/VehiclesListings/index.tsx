import { Box, Chip, Typography } from "@mui/material";
import { VehicleTable } from "./VehicleTable";
import { useAppSelector } from "../../../app/hooks";
import { selectVehiclesState } from "../../../app/vehiclesReducer/vehiclesSlice";

const VehicleListings = () => {
  const { data, loading } = useAppSelector(selectVehiclesState);

  return (
    <Box sx={{ borderLeft: "1px solid rgba(0, 0, 0, 0.12)", width: "75%" }}>
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
          size="medium"
          sx={{
            border: "1px solid black",
            backgroundColor: "white",
            color: 'green'
          }}
        />
      </Box>

      <VehicleTable />
    </Box>
  );
};

export default VehicleListings;
