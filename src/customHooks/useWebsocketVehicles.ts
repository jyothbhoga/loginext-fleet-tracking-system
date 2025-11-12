// src/customHooks/useWebSocketVehicles.ts

import { useEffect, useRef } from "react";
import { useAppDispatch } from "../app/hooks";
import { receiveWebSocketUpdate } from "../app/vehiclesReducer/vehiclesSlice";
import { STATISTICS_URL, VEHICLE_LIST_URL, WEBSOCKET_URL } from "../common/config";
import { fetchStatisticsApi } from "../components/Dashboard/VehiclesStatistics/fetchStatistics";

export function useWebSocketVehicles() {
  const dispatch = useAppDispatch();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected successfully.");
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (Array.isArray(message.data)) {
          dispatch(receiveWebSocketUpdate(message.data));
          fetchStatisticsApi(STATISTICS_URL, dispatch);
          console.log(
            `Received vehicle update via WebSocket: ${message.data.length} vehicles.`
          );
        } else {
          console.warn(
            "WebSocket message not in expected array format:",
            message
          );
        }
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      console.log("Closing WebSocket connection.");
      socket.close();
    };
  }, [dispatch]);

  return {
    sendMessage: (message: string) => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(message);
      }
    },
  };
}
