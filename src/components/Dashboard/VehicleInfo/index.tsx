import React from "react";

import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeVehicleModal,
  selectVehicleModalState,
} from "../../../app/modalReducer/modalSlice";

export const VehicleDetailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, vehicleId } = useAppSelector(selectVehicleModalState);

  const handleClose = () => {
    dispatch(closeVehicleModal());
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Details for Vehicle: {vehicleId}</DialogTitle>
      <DialogContent>
        <p>This is the content for vehicle {vehicleId}.</p>
      </DialogContent>
      <Button onClick={handleClose}>Close</Button>
    </Dialog>
  );
};
