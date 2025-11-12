import { Chip, TableCell, TableRow } from "@mui/material";
import type { Vehicle } from "../../../common/interface";
import { formatCustomLocalGeneric } from "../../../common/utils";

const VehicleTableRow = ({
  vehicle,
  handleOpenModal,
}: {
  vehicle: Vehicle;
  handleOpenModal: (id: string) => void;
}) => {
  return (
    <TableRow>
      <TableCell
        sx={{
          color: "#3f51b5",
          fontWeight: "bold",
          textDecoration: "underline",
        }}
        onClick={() => handleOpenModal(vehicle.id)}
      >
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
      <TableCell>
        {formatCustomLocalGeneric(vehicle.lastUpdated, "DD:MM:YYYY, HH:mm:ss")}
      </TableCell>
      <TableCell>{`${vehicle.currentLocation.lat}, ${vehicle.currentLocation.lat}`}</TableCell>
    </TableRow>
  );
};

export default VehicleTableRow;
