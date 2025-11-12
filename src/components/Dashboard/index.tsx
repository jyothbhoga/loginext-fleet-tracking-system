import { Box, Container, Divider } from "@mui/material";
import Header from "../../reusableComponents/Header";
import VehicleFilters from "./VehiclesFilters";
import VehicleListings from "./VehiclesListings";
import VehicleStatistics from "./VehiclesStatistics";
import { VehicleDetailModal } from "./VehicleInfo";

const Dashboard = () => {
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Header />
      <Divider />
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "25%",
            margin: "16px",
          }}
        >
          <VehicleFilters />
          <Divider />

          <VehicleStatistics />
        </Box>
        <VehicleListings />
      </Box>
      <VehicleDetailModal />
    </Container>
  );
};

export default Dashboard;
