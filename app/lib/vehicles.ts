export function calculateAverageDelay(vehicles: any[]) {
  return (
    vehicles?.reduce((acc: number, v: any) => acc + v.TimeData.Deviation) /
    vehicles?.length
  );
}

export async function getNextStop(vehicleNumber: string) {
  const res = await fetch(`/api/tripRoute?vehicleNumber=${vehicleNumber}`);
  const data = await res.json();
  const nextStop = data?.PatternData?.StopPoints[0];
  return nextStop;
}
