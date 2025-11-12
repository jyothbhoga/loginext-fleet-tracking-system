import React from "react";

import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeVehicleModal,
  selectVehicleModalState,
} from "../../../app/modalReducer/modalSlice";
import { useFetchSingleVehicle } from "../../../customHooks/useFetchSingleVehicle";
import { VEHICLE_LIST_URL } from "../../../common/config";
import { selectSingleVehicleState } from "../../../app/singleVehicleReducer/singleVehicleSlice";

export const VehicleDetailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, vehicleId } = useAppSelector(selectVehicleModalState);

  useFetchSingleVehicle(`${VEHICLE_LIST_URL}/${vehicleId}`);

  const { data, loading, error } = useAppSelector(selectSingleVehicleState);

  const renderContent = () => {
    if (loading) {
      return <DialogContent>Loading vehicles...</DialogContent>;
    }

    if (error) {
      return (
        <DialogContent style={{ color: "red" }}>
          Error loading data: {error}
        </DialogContent>
      );
    }
    return (
      <>
        <DialogTitle>Details for Vehicle: {vehicleId}</DialogTitle>
        <DialogContent>
          <p>This is the content for vehicle {vehicleId}.</p>
        </DialogContent>
        <Button onClick={handleClose}>Close</Button>
      </>
    );
  };

  const handleClose = () => {
    dispatch(closeVehicleModal());
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {renderContent()}
    </Dialog>
  );
};
