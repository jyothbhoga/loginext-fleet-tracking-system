import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectVehiclesState } from "../../../app/vehiclesReducer/vehiclesSlice";
import VehicleTableRow from "./VehicleTableRow";
import { openVehicleModal } from "../../../app/modalReducer/modalSlice";

export const VehicleTable: React.FC = () => {
  const { data, loading, error } = useAppSelector(selectVehiclesState);
  const dispatch = useAppDispatch();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <Typography variant="body1">Loading vehicles...</Typography>
      </Box>
    );
  }

  if (error) {
    return <div style={{ color: "red" }}>Error loading data: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No vehicles found.</div>;
  }

  const handleOpenModal = (vehicleId: string) => {
    dispatch(openVehicleModal(vehicleId));
  };

  return (
    <Table>
      <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
        <TableRow>
          {[
            "Vehicle",
            "Driver",
            "Status",
            "Speed",
            "Destination",
            "ETA",
            "Last Update",
            "Location",
          ].map((header) => (
            <TableCell key={header} sx={{ fontWeight: "bold" }}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((vehicle) => (
          <VehicleTableRow
            vehicle={vehicle}
            key={vehicle.id}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </TableBody>
    </Table>
  );
};
