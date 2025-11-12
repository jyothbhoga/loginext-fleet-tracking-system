import { Box, Typography } from "@mui/material";
import type { Statistic_Card } from "../../../common/interface";
import { VEHICLE_CHIP_DESIGN } from "../../../common/utils";

interface FilterCardProps {
  filter: Statistic_Card;
  selectedFilter: string;
  selectFilter: (id: string) => void;
}
const FilterCard = ({
  filter,
  selectedFilter,
  selectFilter,
}: FilterCardProps) => {
  const IconComponent = filter.icon;
  const activeFilter = selectedFilter === filter.id;

  return (
    <Box
      width="39%"
      border={`1px solid ${activeFilter ? "blue" : "lightgray"}`}
      borderRadius="10px"
      p="10px"
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 0.5,
      }}
      onClick={() => selectFilter(filter.id)}
    >
      <IconComponent
        sx={{
          color: VEHICLE_CHIP_DESIGN[filter.id as keyof typeof VEHICLE_CHIP_DESIGN].textColor,
          fontSize: "1rem",
          marginRight: "5px",
        }}
      />
      <Typography
        sx={{ color: activeFilter ? "blue" : "black" }}
      >{`${filter.label} ( ${filter.value} )`}</Typography>
    </Box>
  );
};

export default FilterCard;
