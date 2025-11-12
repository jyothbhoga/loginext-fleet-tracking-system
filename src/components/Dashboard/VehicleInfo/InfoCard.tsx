import { Box, Typography } from "@mui/material";

interface InfoCardProps {
  label: string;
  value: React.ReactNode;
  isProgress?: boolean | undefined;
  isChip?: boolean | undefined;
}

const InfoCard: React.FC<InfoCardProps> = ({
  label,
  value,
}) => (
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
      borderLeft: '4px solid blue'
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", color: "#555", mb: 1 }}>
      {/* <Box sx={{ fontSize: "1.2rem", mr: 1, display: "flex" }}>{icon}</Box> */}
      <Typography
        variant="caption"
        sx={{ textTransform: "uppercase", fontWeight: 600 }}
      >
        {label}
      </Typography>
    </Box>
    <Typography
      variant="subtitle1"
    >
      {value}
    </Typography>
  </Box>
);

export default InfoCard;
