import { Box, Container, Divider } from "@mui/material";
import Header from "../../reusableComponents/Header";
import VehicleFilters from "./VehicleFilters";
import VehicleListings from "./VehicleListings";
import VehicleStatistics from "./VehicleStatistics";

const Dashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Header />
      <Divider />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "25%" }}>
          <VehicleFilters />
          <Divider />

          <VehicleStatistics />
        </Box>
        <VehicleListings />
      </Box>
    </Container>
  );
};

export default Dashboard;
