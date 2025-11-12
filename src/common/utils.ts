import type { Statistic, Vehicle } from "./interface";

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

export const transfromFleetStatistics = (stats: Statistic) => {
  return [
    {
      label: "TOTAL FLEET",
      value: stats.total,
      id: "total",
    },
    {
      label: "AVG SPEED",
      value: stats.average_speed,
      id: "average_speed",
    },
    {
      label: "MOVING",
      value: stats.en_route,
      id: "en_route",
    },
    {
      label: "LAST UPDATE",
      value: formatCustomLocalGeneric(stats.timestamp, "HH:MM"),
      id: "timestamp",
    },
  ];
};

export const transformFilters = (stats: Statistic) => {
  return [
    {
      label: "All",
      value: stats.total,
      id: "total",
    },
    {
      label: "Idle",
      value: stats.idle,
      id: "idle",
    },
    {
      label: "En Route",
      value: stats.en_route,
      id: "en_route",
    },
    {
      label: "Delivered",
      value: stats.delivered,
      id: "delivered",
    },
  ];
};

export const transformVehicleInfo = (data: Vehicle) => {
  return [
    {
      label: "STATUS",
      value: data.status.toLocaleUpperCase().replaceAll("_", " "),
      id: "status",
      isChip: true,
    },
    {
      label: "CURRENT SPEED",
      value: data.speed,
      id: "speed",
    },
    {
      label: "DRIVE",
      value: data.driverName,
      id: "driverName",
    },
    {
      label: "PHONE",
      value: data.driverPhone,
      id: "driverPhone",
    },
    {
      label: "DESTINATION",
      value: data.destination,
      id: "destination",
    },
    {
      label: "LOCATION",
      value: `${data.currentLocation.lat}, ${data.currentLocation.lat}`,
      id: "currentLocation",
    },
    {
      label: "BATTERY LEVEL",
      value: data.batteryLevel,
      id: "batteryLevel",
      isProgress: true,
    },
    {
      label: "FUEL LEVEL",
      value: data.fuelLevel,
      id: "fuelLevel",
      isProgress: true,
    },
    {
      label: "LAST UPDATED",
      value: formatCustomLocalGeneric(data.lastUpdated, "DD/MM/YYYY, HH:mm:ss"),
      id: "lastUpdated",
    },
  ];
};
