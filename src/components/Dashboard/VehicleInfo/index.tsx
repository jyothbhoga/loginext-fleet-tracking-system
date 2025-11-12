import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeVehicleModal,
  selectVehicleModalState,
} from "../../../app/modalReducer/modalSlice";
import { useFetchSingleVehicle } from "../../../customHooks/useFetchSingleVehicle";
import { selectSingleVehicleState } from "../../../app/singleVehicleReducer/singleVehicleSlice";
import InfoCard from "./InfoCard";
import { transformVehicleInfo } from "../../../common/utils";
import CloseIcon from "@mui/icons-material/Close";

export const VehicleDetailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, vehicleId } = useAppSelector(selectVehicleModalState);

  useFetchSingleVehicle(vehicleId ?? "");

  const { data, loading, error } = useAppSelector(selectSingleVehicleState);
  const vehicleInfoArr = data && transformVehicleInfo(data);

  const renderContent = () => {
    if (loading) {
      return <DialogContent>Loading vehicle Data...</DialogContent>;
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
        <DialogTitle sx={{ paddingBottom: "0" }}>
          <Typography>{data?.vehicleNumber}</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            size="small"
            // Ensures the icon button doesn't affect the title's alignment
            sx={{ ml: "auto", float: "right", mt: "-28px" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box
          sx={{ display: "flex", paddingLeft: "24px", paddingBottom: "20px" }}
        >
          <Typography>
            {data?.driverName} •{" "}
            {data?.status.toLocaleUpperCase().replaceAll("_", " ")}{" "}
          </Typography>
        </Box>
        <Divider />
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap", // Allow items to wrap to the next line
              gap: 2, // Spacing between all cards (rows and columns)
            }}
          >
            {vehicleInfoArr?.map((info) => {
              return <InfoCard {...info} key={info.id} />;
            })}
          </Box>
        </DialogContent>
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
