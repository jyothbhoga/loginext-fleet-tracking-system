import { Box, Paper, Typography } from "@mui/material";
import type { Statistic_Card } from "../../../common/interface";

const StatisticCard = (stat: Statistic_Card) => {
  return (
    <Box width="47%">
      <Paper variant="outlined" sx={{ p: 1, textAlign: "center" }}>
        <Typography variant="h5" color="black" fontWeight="bold">
          {stat.value}
        </Typography>
        <Typography variant="caption" color="gray">
          {stat.label}
        </Typography>
      </Paper>
    </Box>
  );
};

export default StatisticCard;
