import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const stop = new URL(req.url).searchParams.get("stop") || "1001";

  const res = await fetch(
    "https://api.swu.de/mobility/v1/stop/passage/Departures?StopNumber=" +
      stop +
      "&Limit=10",
  );

  const data = await res.json();

  return NextResponse.json(data);
}
