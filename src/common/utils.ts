import type { Statistic, Vehicle } from "./interface";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import MovingOutlinedIcon from "@mui/icons-material/MovingOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Battery0BarOutlinedIcon from "@mui/icons-material/Battery0BarOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export function formatCustomLocalGeneric(
  isoString: string,
  formatString: string
): string {
  try {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Needed to determine AM/PM
    };

    const parts = new Intl.DateTimeFormat(undefined, options).formatToParts(
      date
    );

    const partsMap = new Map(parts.map((p) => [p.type, p.value]));

    const replacements: { [id: string]: string } = {
      YYYY: partsMap.get("year") || "",
      MM: partsMap.get("month") || "",
      DD: partsMap.get("day") || "",

      HH: (partsMap.get("hour") || "").padStart(2, "0"),
      mm: partsMap.get("minute") || "00",
      ss: partsMap.get("second") || "00",

      A: partsMap.get("dayPeriod") || "",

      hh:
        new Date(date)
          .toLocaleTimeString(undefined, { hour: "2-digit", hour12: true })
          .match(/\d+/)?.[0] || "",
    };

    let formattedString = formatString;

    const sortedKeys = Object.keys(replacements).sort(
      (a, b) => b.length - a.length
    );

    for (const key of sortedKeys) {
      formattedString = formattedString.replace(
        new RegExp(key, "g"),
        replacements[key]
      );
    }

    formattedString = formattedString
      .replace(/\s*(a\.m\.|p\.m\.|am|pm)/i, (match) =>
        formatString.includes("A") ? match : ""
      )
      .trim();

    return formattedString;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Formatting Error";
  }
}

export const transfromFleetStatistics = (stats: Statistic, lastUpdated: string) => {
  return [
    {
      label: "TOTAL FLEET",
      value: stats.total,
      id: "total",
      icon: PeopleAltOutlinedIcon,
    },
    {
      label: "AVG SPEED",
      value: stats.average_speed,
      id: "average_speed",
      icon: TrendingUpOutlinedIcon,
    },
    {
      label: "MOVING",
      value: stats.en_route,
      id: "en_route",
      icon: MovingOutlinedIcon,
    },
    {
      label: "LAST UPDATE",
      value: formatCustomLocalGeneric(lastUpdated, "HH:mm"),
      id: "timestamp",
      icon: WatchLaterOutlinedIcon,
    },
  ];
};

export const transformFilters = (stats: Statistic) => {
  return [
    {
      label: "All",
      value: stats.total,
      id: "all",
      icon: FiberManualRecordIcon,
    },
    {
      label: "Idle",
      value: stats.idle,
      id: "idle",
      icon: FiberManualRecordIcon,
    },
    {
      label: "En Route",
      value: stats.en_route,
      id: "en_route",
      icon: FiberManualRecordIcon,
    },
    {
      label: "Delivered",
      value: stats.delivered,
      id: "delivered",
      icon: FiberManualRecordIcon,
    },
  ];
};

export const transformVehicleInfo = (data: Vehicle) => {
  return [
    {
      label: "STATUS",
      value: data.status,
      id: "status",
      isChip: true,
      icon: NearMeOutlinedIcon,
    },
    {
      label: "CURRENT SPEED",
      value: data.speed + " mph",
      id: "speed",
      icon: SpeedOutlinedIcon,
    },
    {
      label: "DRIVE",
      value: data.driverName,
      id: "driverName",
      icon: Person2OutlinedIcon,
    },
    {
      label: "PHONE",
      value: data.driverPhone,
      id: "driverPhone",
      icon: LocalPhoneOutlinedIcon,
    },
    {
      label: "DESTINATION",
      value: data.destination,
      id: "destination",
      icon: PlaceOutlinedIcon,
    },
    {
      label: "LOCATION",
      value: `${data.currentLocation.lat.toFixed(
        6
      )}, ${data.currentLocation.lng.toFixed(6)}`,
      id: "currentLocation",
      icon: NearMeOutlinedIcon,
    },
    {
      label: "BATTERY LEVEL",
      value: data.batteryLevel,
      id: "batteryLevel",
      isProgress: true,
      icon: Battery0BarOutlinedIcon,
    },
    {
      label: "FUEL LEVEL",
      value: data.fuelLevel,
      id: "fuelLevel",
      isProgress: true,
      icon: LocalGasStationOutlinedIcon,
    },
    {
      label: "LAST UPDATED",
      value: formatCustomLocalGeneric(data.lastUpdated, "DD/MM/YYYY, HH:mm:ss"),
      id: "lastUpdated",
      icon: AccessTimeOutlinedIcon,
    },
  ];
};

export const VEHICLE_CHIP_DESIGN = {
  all: {
    textColor: "#3F51B5",
    bgColor: "transparent",
  },
  idle: {
    textColor: "#6c757d",
    bgColor: "#f8f9fa",
  },
  en_route: {
    textColor: "#17a2b8",
    bgColor: "#e9f2f5",
  },
  delivered: {
    textColor: "#28a745",
    bgColor: "#d4edda",
  },
  speed: {
    bgColor: "#f8f9fa",
    textColor: "#000",
  },
};

export const getRealTimeUpdates = (timestamp: string) => {
  const now = new Date().getTime();
  const lastUpdateTime = new Date(timestamp).getTime();
  const diffInMs = now - lastUpdateTime;
  
  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  let lastUpdated = "";
  if (days > 0) {
    lastUpdated = `${days}d ago`;
  } else if (hours > 0) {
    lastUpdated = `${hours}h ago`;
  } else if (minutes > 0) {
    const remainingSeconds = seconds % 60;
    if (remainingSeconds > 0) {
      lastUpdated = `${minutes}m ${remainingSeconds}s ago`;
    } else {
      lastUpdated = `${minutes}m ago`;
    }
  } else {
    lastUpdated = `${seconds}s ago`;
  }
  
  const updateIntervalMs = 3 * 60 * 1000; 
  const nextUpdateMs = updateIntervalMs - (diffInMs % updateIntervalMs);
  const nextUpdateMinutes = Math.ceil(nextUpdateMs / 1000 / 60);
  
  const nextUpdate = `~${nextUpdateMinutes} minute${nextUpdateMinutes !== 1 ? 's' : ''}`;
  
  return { lastUpdated, nextUpdate };
};

