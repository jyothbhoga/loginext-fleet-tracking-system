import { Box, Paper, Typography } from "@mui/material";
import type { Statistic_Card } from "../../../common/interface";

const StatisticCard = (stat: Statistic_Card) => {
  const IconComponent = stat.icon;
  
  return (
    <Box width="47%">
      <Paper variant="outlined" sx={{ p: 1, textAlign: "center" }}>
        <Typography variant="h5" color="black" fontWeight="bold">
          {stat.value}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 0.5,
          }}
        >
          <IconComponent
            sx={{
              color: "black",
              fontSize: "1rem",
              marginRight: "5px",
            }}
          />
          <Typography variant="caption" color="gray">
            {stat.label}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default StatisticCard;
