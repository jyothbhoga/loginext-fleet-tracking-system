import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box mb={3}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", color: "#1a1a1a" }}
        >
        🚛 Fleet Tracking Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Real-time vehicle monitoring • LogiNext Case Study
      </Typography>
    </Box>
  );
};

export default Header;
