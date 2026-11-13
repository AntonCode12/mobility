"use client";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

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

  const averageDelay =
    activeVehicles?.reduce(
      (acc: number, v: any) => acc + v.TimeData.Deviation,
    ) / activeVehicles?.length;

  async function getNextStop(vehicleNumber: string) {
    const res = await fetch(`/api/tripRoute?vehicleNumber=${vehicleNumber}`);
    const data = await res.json();
    const nextStop = data?.PatternData?.StopPoints[0];
    return nextStop;
  }

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
      <div>
        <div className="absolute top-4 left-4 z-500 rounded-xl bg-white/90 p-3 text-xs">
          <p className="text-xl">SWU ÖPNV Tracker</p>
          <p className="font-semibold">Legende</p>
          <ul>
            <li>🚌 Bus</li>
            <li>🚋 Straßenbahn</li>
          </ul>
          <p className="font-semibold">
            Durchschnittliche Verspätung:{" "}
            <span className="font-normal">
              {averageDelay ? Math.round(averageDelay / -60) : 0} min
            </span>
          </p>
          <div className="flex flex-row">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const PostionData = activeVehicles?.find(
                  (v: any) =>
                    v.VehicleNumber ===
                    Number(e.currentTarget.vehicleNumberInput.value),
                )?.PositionData;
                if (PostionData) {
                  setTarget([PostionData.Latitude, PostionData.Longitude]);
                }
                console.log(PostionData);
              }}
            >
              <input
                type="text"
                placeholder="Fahrzeugnummer"
                id="vehicleNumberInput"
                className="border rounded p-1 mr-2 my-2"
              />
            </form>
            <button
              className="bg-blue-400 rounded  text-white hover:bg-blue-500"
              onClick={() => setTarget(null)}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlyController({
  target,
  zoom,
}: {
  target: [number, number] | null;
  zoom?: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target, zoom ?? 18, { duration: 1.2 });
    } else {
      map.flyTo([48.397798, 9.990832], 13, { duration: 1.2 }); // Default Augsburg
    }
  }, [target, map]);
  return null;
}
