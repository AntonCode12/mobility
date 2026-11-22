"use client";
import DepartureHeader from "./DepartureHeader";
import { useEffect, useState } from "react";
import DepartureList from "./DepartureList";
export default function DepartureSearch() {
  const [stopNumber, setStopNumber] = useState("1001");
  const [data, setData] = useState<any>(null);
  const [stopName, setStopName] = useState<string>("");
  useEffect(() => {
    const loadData = () => {
      fetch("/api/stopData")
        .then((res) => res.json())
        .then(setData);
    };
    loadData();

    const interval = setInterval(loadData, 84000);
    return () => clearInterval(interval);
  }, []);
  const stops = data?.StopAttributes?.StopData;
  return (
    <>
      <DepartureHeader
        stopNumber={stopNumber}
        setStopNumber={setStopNumber}
        stops={stops}
        setStopName={setStopName}
      />
      <div className="bg-black min-h-screen">
        <DepartureList stopNumber={stopNumber} stopName={stopName} />
      </div>
    </>
  );
}
