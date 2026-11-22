"use client";
import { Suspense, useEffect, useState } from "react";
export default function DepartureList({
  stopNumber,
  stopName,
}: {
  stopNumber: string;
  stopName: string;
}) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const loadData = () => {
      fetch("/api/departures?stop=" + stopNumber)
        .then((res) => res.json())
        .then(setData);
    };
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-black p-4">
      <div className="">
        <h1 className="text-white text-xl font-bold">
          <span className="text-yellow-500 border p-1 rounded-lg mr-2 bg-yellow-950 border-yellow-700">
            {stopNumber}
          </span>
          {stopName}
        </h1>
        <table className="w-full mt-4 ">
          <Suspense fallback={<div>Lade Haltestelle {stopNumber}</div>}>
            {data?.StopPassage?.DepartureData?.map((departure: any) => (
              <tr
                className=" text-white text-left border-b border-zinc-600"
                key={departure.RouteName + departure.DepartureTimeActual}
              >
                <th>
                  {departure.RouteName} {departure.DepartureDirectionText}
                </th>
                <td>
                  <span className="text-zinc-400">
                    {Math.round(departure.DepartureCountdown / 60)} min
                  </span>
                </td>
              </tr>
            ))}
          </Suspense>
        </table>
      </div>
    </div>
  );
}
