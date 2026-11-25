import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.swu.de/mobility/v1/stop/attributes/BaseData" +
      "?ContentScope=extended",
    {
      next: { revalidate: 84000 },
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
