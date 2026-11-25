"use client";
import { Stop } from "@/lib/stops";
import DepartureHeader from "./DepartureHeader";
import { useEffect, useState } from "react";
import DepartureList from "./DepartureList";
export default function DepartureSearch() {
  const [stop, setStop] = useState<Stop>({
    StopNumber: "404",
    StopName: "Not Found",
  });
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const loadData = () => {
      fetch("/api/stopData")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    };
    loadData();

    const interval = setInterval(loadData, 84000);
    return () => clearInterval(interval);
  }, []);
  const stops = data?.StopAttributes?.StopData;
  return (
    <>
      <DepartureHeader stops={stops} stop={stop} setStop={setStop} />
      <div className="bg-black min-h-screen">
        {stop.StopName !== "Not Found" ? (
          <DepartureList stop={stop} />
        ) : (
          <div className="text-white text-center p-4">
            Haltestelle entweder nicht gefunden oder noch nicht verfügbar. Bitte
            versuchen Sie es später erneut.
          </div>
        )}
      </div>
    </>
  );
}
