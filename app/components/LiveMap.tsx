"use client";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import FlyController from "./FlyController";
import MapControls from "./MapControls";
import { calculateAverageDelay, getNextStop } from "../lib/vehicles";

export default function LiveMap() {
  const [target, setTarget] = useState<[number, number] | null>(null);
  const [data, setData] = useState<any>(null);

  const busIcon = L.divIcon({
    html: '<div style="font-size: 20px">🚌</div>',
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const tramIcon = L.divIcon({
    html: '<div style="font-size: 20px">🚋</div>',
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  useEffect(() => {
    const loadData = () => {
      fetch("/api/tracker")
        .then((res) => res.json())
        .then(setData);
    };
    loadData();

    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  const activeVehicles = data?.VehicleTrip.TripData.filter(
    (v: any) => v.IsActive,
  );

  const averageDelay = calculateAverageDelay(activeVehicles);

  return (
    <div className="relative">
      <MapContainer
        center={[48.397798, 9.990832]} // Ulm Mitte
        zoom={12}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {activeVehicles?.map((v: any) => (
          <Marker
            key={v.VehicleNumber}
            position={[v.PositionData.Latitude, v.PositionData.Longitude]}
            icon={v.VehicleCategory == "1" ? tramIcon : busIcon}
          >
            <Tooltip direction="top" interactive={true}>
              <strong>{v.JourneyData.RouteNumber} </strong>
              {v.JourneyData.DepartureDirectionText}
              <br />
              {v.TimeData.Deviation < 0 && (
                <span>
                  Verspätung:{" "}
                  <span className="text-red-500 text-semibold">
                    {Math.round(v.TimeData.Deviation / -60)} min
                  </span>
                </span>
              )}
              <p>Fahrzeugnummer: {v.VehicleNumber}</p>
            </Tooltip>
          </Marker>
        ))}
        <FlyController target={target} />
      </MapContainer>
      <MapControls
        averageDelay={averageDelay}
        activeVehicles={activeVehicles}
        setTarget={setTarget}
      />
    </div>
  );
}
