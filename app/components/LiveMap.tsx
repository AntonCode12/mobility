"use client";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import FlyController from "./FlyController";
import MapControls from "./MapControls";
import { calculateAverageDelay } from "../lib/vehicles";

export default function LiveMap() {
  const [target, setTarget] = useState<[number, number] | null>(null);
  const [data, setData] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const busIcon = L.divIcon({
    html: '<div style="font-size: 20px">🚌</div>',
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const targetIconBus = L.divIcon({
    html: '<div style="font-size: 20px; display: flex; flex-direction: column; align-items: center;"><span>🚌</span><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span><span class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-500"></span></div>',
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
  const targetIconTram = L.divIcon({
    html: '<div style="font-size: 20px">🚋<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span><span class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-500"></span></div>',
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
        center={[48.397798, 9.990832]}
        zoom={12}
        style={{ height: "100vh", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {activeVehicles?.map((v: any) => {
          const isTarget =
            target &&
            v.PositionData.Latitude === target[0] &&
            v.PositionData.Longitude === target[1];
          if (isTarget) {
            console.log("Target vehicle found:", v.VehicleCategory);
          }
          let icon = v.VehicleCategory === 1 ? tramIcon : busIcon; // Default icon, will be overridden below

          switch (isTarget) {
            case true:
              switch (v.VehicleCategory) {
                case 1:
                  icon = targetIconTram;
                  break;
                case 5:
                  icon = targetIconBus;
                  break;
              }
              break;
            case false:
              switch (v.VehicleCategory) {
                case 1:
                  icon = tramIcon;
                  break;
                case 5:
                  icon = busIcon;
                  break;
              }
              break;
          }

          return (
            <div key={v.VehicleNumber}>
              <Marker
                position={[v.PositionData.Latitude, v.PositionData.Longitude]}
                icon={icon}
              >
                <Tooltip direction="top" interactive={true}>
                  <strong>{v.JourneyData.RouteNumber} </strong>
                  {v.JourneyData.DepartureDirectionText}
                  <br />
                  {Math.round(v.TimeData.Deviation) < 0 && (
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
            </div>
          );
        })}
        <FlyController target={target} />
      </MapContainer>
      <MapControls
        averageDelay={averageDelay}
        activeVehicles={activeVehicles}
        setTarget={setTarget}
        target={target}
        setNotFound={setNotFound}
        notFound={notFound}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
    </div>
  );
}
