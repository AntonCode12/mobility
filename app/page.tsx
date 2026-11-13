"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = () => {
      fetch("/api/departures?stop=1002")
        .then((res) => res.json())
        .then(setData);
    };
    loadData();

    setInterval(loadData, 10000); // Refresh every 10 seconds
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <h1>Departures</h1>
      {data.StopPassage.DepartureData.map((departure: any) => (
        <div key={departure.VehicleNumber}>
          <p>
            {departure.RouteName} {departure.DepartureDirectionText} coming in{" "}
            {Math.round(departure.DepartureCountdown / 60)} minutes
          </p>
        </div>
      ))}
    </>
  );
}
