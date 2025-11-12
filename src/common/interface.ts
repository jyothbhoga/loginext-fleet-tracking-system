export interface Vehicle {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  status: string;
  destination: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  speed: number;
  lastUpdated: string;
  estimatedArrival: string;
  batteryLevel: number;
  fuelLevel: number;
}
