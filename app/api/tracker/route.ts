import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await fetch("https://api.swu.de/mobility/v1/vehicle/trip/Trip");

  const data = await res.json();

  return NextResponse.json(data);
}
