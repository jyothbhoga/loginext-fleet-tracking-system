import {
  Box,
  Chip,
  LinearProgress,
  Typography,
  type SvgIconTypeMap,
} from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { VEHICLE_CHIP_DESIGN } from "../../../common/utils";

interface InfoCardProps {
  label: string;
  value: React.ReactNode;
  isProgress?: boolean | undefined;
  isChip?: boolean | undefined;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  id: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  label,
  value,
  isProgress,
  isChip,
  icon,
  id,
}) => {
  const IconComponent = icon;

  const getNumericValue = (): number => {
    return typeof value === "number" ? value : Number(value) || 0;
  };

  const getProgressColor = (): "error" | "warning" | "success" => {
    const numValue = getNumericValue();
    if (numValue < 20) return "error";
    if (numValue < 50) return "warning";
    return "success";
  };

  const chipLabel =
    typeof value === "string"
      ? value.replaceAll("_", " ")
      : String(value ?? "");

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "8px",
        backgroundColor: "#f8f8f8",
        height: "100%",
        width: "40%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderLeft: "4px solid blue",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", color: "#555", mb: 1 }}>
        <IconComponent
          sx={{
            fontSize: "1rem",
            marginRight: "5px",
            rotate: id === "batteryLevel" ? "90deg" : "0deg",
          }}
        />
        <Typography
          variant="caption"
          sx={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          {label}
        </Typography>
      </Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {isChip ? (
          <Chip
            label={chipLabel}
            size="small"
            sx={{
              backgroundColor:
                VEHICLE_CHIP_DESIGN[value as keyof typeof VEHICLE_CHIP_DESIGN]
                  .bgColor,
              color:
                VEHICLE_CHIP_DESIGN[value as keyof typeof VEHICLE_CHIP_DESIGN]
                  .textColor,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          />
        ) : (
          value
        )}
        {isProgress && " %"}
      </Typography>
      {isProgress && (
        <LinearProgress
          variant="determinate"
          value={getNumericValue()}
          color={getProgressColor()}
          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
        />
      )}
    </Box>
  );
};

export default InfoCard;
