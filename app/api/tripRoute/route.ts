import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const vehicleNumber = new URL(req.url).searchParams.get("stop") || "1001";

  const res = await fetch(
    "https://api.swu.de/mobility/v1/vehicle/trip/Pattern?VehicleNumber=" +
      vehicleNumber,
  );

  const data = await res.json();

  return NextResponse.json(data);
}
