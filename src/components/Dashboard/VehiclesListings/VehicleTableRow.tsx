import { Chip, TableCell, TableRow } from "@mui/material";
import type { Vehicle } from "../../../common/interface";
import {
  formatCustomLocalGeneric,
  VEHICLE_CHIP_DESIGN,
} from "../../../common/utils";

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
          cursor: "pointer",
        }}
        onClick={() => handleOpenModal(vehicle.id)}
      >
        {vehicle.vehicleNumber}
      </TableCell>
      <TableCell>{vehicle.driverName}</TableCell>
      <TableCell>
        <Chip
          label={vehicle.status.replaceAll("_", " ")}
          size="small"
          sx={{
            backgroundColor:
              VEHICLE_CHIP_DESIGN[
                vehicle.status as keyof typeof VEHICLE_CHIP_DESIGN
              ].bgColor,
            color:
              VEHICLE_CHIP_DESIGN[
                vehicle.status as keyof typeof VEHICLE_CHIP_DESIGN
              ].textColor,
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
            backgroundColor: VEHICLE_CHIP_DESIGN.speed.bgColor,
            color: VEHICLE_CHIP_DESIGN.speed.textColor,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        />
      </TableCell>
      <TableCell>{vehicle.destination}</TableCell>
      <TableCell>{vehicle.estimatedArrival ?? "-"}</TableCell>
      <TableCell>
        {formatCustomLocalGeneric(vehicle.lastUpdated, "DD/MM/YYYY, HH:mm:ss")}
      </TableCell>
      <TableCell>{`${vehicle.currentLocation.lat.toFixed(
        4
      )}, ${vehicle.currentLocation.lat.toFixed(4)}`}</TableCell>
    </TableRow>
  );
};

export default VehicleTableRow;
