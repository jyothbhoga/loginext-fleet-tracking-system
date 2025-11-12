import { Chip, TableCell, TableRow } from "@mui/material";
import type { Vehicle } from "../../../common/interface";
import { formatCustomLocal } from "../../../common/utils";

const VehicleTableRow = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <TableRow key={vehicle.id}>
      <TableCell sx={{ color: "#3f51b5", fontWeight: "bold", textDecoration: 'underline' }}>
        {vehicle.vehicleNumber}
      </TableCell>
      <TableCell>{vehicle.driverName}</TableCell>
      <TableCell>
        <Chip
          label={vehicle.status}
          size="small"
          sx={{
            backgroundColor:
              vehicle.status === "delivered" ? "#e8f5e9" : "lightgray",
            color: vehicle.status === "delivered" ? "#2e7d32" : "black",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={`${vehicle.speed} mph`}
          size="small"
          sx={{
            backgroundColor: "lightgray",
            color: "black",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        />
      </TableCell>
      <TableCell>{vehicle.destination}</TableCell>
      <TableCell>{vehicle.estimatedArrival ?? "-"}</TableCell>
      <TableCell>{formatCustomLocal(vehicle.lastUpdated)}</TableCell>
      <TableCell>{`${vehicle.currentLocation.lat}, ${vehicle.currentLocation.lat}`}</TableCell>
    </TableRow>
  );
};

export default VehicleTableRow;
