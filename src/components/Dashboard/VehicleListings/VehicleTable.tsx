// src/components/VehiclesComponent.tsx

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectVehiclesState } from "../../../app/vehicleReducer/vehicleSlice";
import VehicleTableRow from "./VehicleTableRow";
import { openVehicleModal } from "../../../app/modalReducer/modalSlice";

export const VehicleTable: React.FC = () => {
  // Select the entire state object from the store
  const { data, loading, error } = useAppSelector(selectVehiclesState);
  const dispatch = useAppDispatch();

  if (loading) {
    return <div>Loading vehicles...</div>;
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
    // Your MUI Table implementation using the 'data' array
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
