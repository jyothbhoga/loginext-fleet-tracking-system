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

export interface Statistic {
  idle: number;
  total: number;
  en_route: number;
  delivered: number;
  average_speed: number;
  timestamp: string;
}

export interface Statistic_Card {
  label: string;
  value: number | string;
  id: string
}
