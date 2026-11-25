"use client";
import { Stop } from "@/app/lib/stops";
import { Suspense, useEffect, useState } from "react";
export default function DepartureList({ stop }: { stop: Stop }) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const loadData = () => {
      fetch("/api/departures?stop=" + stop.StopNumber)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    };
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, [stop.StopNumber]);
  function renderRouteStyle(route: number) {
    switch (route) {
      case 1:
        return "text-red-200 border-red-200 bg-red-950";
      case 2:
        return "text-green-700 border-green-700 bg-green-950";
      case 4:
        return "text-green-300 border-green-300 bg-green-950";
      case 5:
        return "text-blue-300 border-blue-300 bg-blue-950";
      case 6:
        return "text-orange-300 border-orange-300 bg-orange-950";
      case 7:
        return "text-purple-300 border-purple-300 bg-purple-950";
      default:
        return "text-mist-300 border-mist-30 bg-mist-950";
    }
  }
  return (
    <div className="bg-black p-4">
      <div className="">
        <h1 className="text-white text-xl font-bold">{stop.StopName}</h1>

        {stop.StopNumber == data?.StopPassage?.StopNumber ? (
          <Suspense fallback={<div>Lade Haltestelle {stop.StopNumber}</div>}>
            {data?.StopPassage?.DepartureData?.map((departure: any) => (
              <div
                key={
                  departure.RouteNumber +
                  departure.DepartureDirectionText +
                  departure.DepartureTimeActual
                }
                className="p-3 border-b border-zinc-600 text-white"
              >
                <span
                  className={`${renderRouteStyle(departure.RouteNumber)} py-2 px-4 border rounded-lg font-bold mr-2`}
                >
                  {departure.RouteNumber}
                </span>
                <span className="mr-2">{departure.DepartureDirectionText}</span>
                <span className="text-zinc-400 mr-2">
                  {new Date(departure.DepartureTimeActual).toLocaleTimeString(
                    "de-DE",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </span>
                <span className=" text-zinc-400 border py-0.5 px-0.5 rounded-lg bg-zinc-950 border-zinc-700">
                  Steig {departure.PlatformName}
                </span>
              </div>
            ))}
          </Suspense>
        ) : (
          <div className="flex flex-col items-center justify-center text-white text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="blue"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin lucide lucide-loader-circle preview-icon"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Lade haltestelle {stop.StopNumber}...
          </div>
        )}
      </div>
    </div>
  );
}
