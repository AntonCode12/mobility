"use client";
import { Stop } from "@/app/lib/stops";
import { useState } from "react";

export default function DepartureHeader({
  stops,
  stop,
  setStop,
}: {
  stops: any;
  stop: Stop;
  setStop: (stop: Stop) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <header className=" bg-black p-5  border-b border-zinc-600">
      <div className="flex items-center gap-2">
        <img
          src="../../favicon.svg"
          alt="Logo"
          className="w-8 h-8 mr-2 inline-block"
        />
        <h1 className="text-xl font-bold text-white ">SWU Mobility Tracker</h1>
        <span className="relative flex size-3 mb-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
        </span>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <form
          onSubmit={(e) => (
            e.preventDefault(),
            setStop({
              StopNumber:
                stops.filter(
                  (stop: any) =>
                    stop.StopName.toLowerCase().includes(
                      searchTerm.toLowerCase(),
                    ) || stop.StopNumber.toString().includes(searchTerm),
                )[0]?.StopNumber || "Haltestelle nicht gefunden",
              StopName:
                stops.filter(
                  (stop: any) =>
                    stop.StopName.toLowerCase().includes(
                      searchTerm.toLowerCase(),
                    ) || stop.StopNumber.toString().includes(searchTerm),
                )[0]?.StopName || "Haltestelle nicht gefunden",
            }),
            setSearchTerm("")
          )}
        >
          <label
            htmlFor="stopNumberInput"
            className="transition-all mb-2 delay-20 ease-in focus-within:ring-2 focus-within:ring-blue-500 gap-2 flex items-center gap-2bg-black text-white placeholder:text-zinc-400 border border-zinc-600 rounded-xl p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search preview-icon text-zinc-600"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
            <span className="sr-only">Haltestelle suchen</span>
            <input
              className="placeholder-zinc-600 focus:outline-none focus:ring-0"
              type="text"
              id="stopNumberInput"
              placeholder="Haltestelle suchen"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm || ""}
            />
          </label>
        </form>
      </div>
      {stops && searchTerm && (
        <div className=" text-white left-0 right-0 bg-black border border-zinc-600 rounded-lg max-h-60 overflow-y-auto">
          {stops
            .filter(
              (stop: any) =>
                stop.StopName.toLowerCase().includes(
                  searchTerm.toLowerCase(),
                ) || stop.StopNumber.toString().includes(searchTerm),
            )
            .map((stop: any) => (
              <div
                key={stop.StopNumber}
                className="p-2 hover:bg-zinc-800 cursor-pointer"
                onClick={(e) => (
                  setStop({
                    StopNumber: stop.StopNumber,
                    StopName: stop.StopName,
                  }),
                  setSearchTerm("")
                )}
              >
                {stop.StopName}
              </div>
            ))}
        </div>
      )}
    </header>
  );
}
