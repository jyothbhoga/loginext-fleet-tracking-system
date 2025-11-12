import { Box, Typography } from "@mui/material";
import type { Statistic_Card } from "../../../common/interface";

interface FilterCardProps {
  filter: Statistic_Card;
  selectedFilter: string;
  selectFilter: any;
}
const FilterCard = ({
  filter,
  selectedFilter,
  selectFilter,
}: FilterCardProps) => {
  return (
    <Box
      width="39%"
      border={`1px solid ${
        selectedFilter === filter.id ? "blue" : "lightgray"
      }`}
      borderRadius="10px"
      p="10px"
      sx={{ cursor: "pointer" }}
      onClick={() => selectFilter(filter.id)}
    >
      <Typography>{`${filter.label} ( ${filter.value} )`}</Typography>
    </Box>
  );
};

export default FilterCard;
