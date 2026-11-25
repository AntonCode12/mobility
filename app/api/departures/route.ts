import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const stop = new URL(req.url).searchParams.get("stop") || "404";
  const limit = new URL(req.url).searchParams.get("limit") || "10";

  const res = await fetch(
    "https://api.swu.de/mobility/v1/stop/passage/Departures?StopNumber=" +
      stop +
      "&Limit=" +
      limit,
  );

  const data = await res.json();

  return NextResponse.json(data);
}
