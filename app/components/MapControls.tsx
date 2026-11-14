export default function MapControls({
  averageDelay,
  activeVehicles,
  setTarget,
}: {
  averageDelay: number | undefined;
  activeVehicles: any[];
  setTarget: any;
}) {
  return (
    <div>
      <div className="absolute top-4 left-4 z-500 rounded-xl bg-white/90 p-3 text-xs">
        <p className="text-xl">SWU ÖPNV Tracker</p>
        <p className="font-semibold">Legende</p>
        <ul>
          <li>🚌 Bus</li>
          <li>🚋 Straßenbahn</li>
        </ul>
        <p className="font-semibold">
          Durchschnittliche Verspätung:{" "}
          <span className="font-normal">
            {averageDelay ? Math.round(averageDelay / -60) : 0} min
          </span>
        </p>
        <div className="flex flex-row">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const PostionData = activeVehicles?.find(
                (v: any) =>
                  v.VehicleNumber ===
                  Number(e.currentTarget.vehicleNumberInput.value),
              )?.PositionData;
              if (PostionData) {
                setTarget([PostionData.Latitude, PostionData.Longitude]);
              }
              console.log(PostionData);
            }}
          >
            <input
              type="text"
              placeholder="Fahrzeugnummer"
              id="vehicleNumberInput"
              className="border rounded p-1 mr-2 my-2"
            />
          </form>
          <button
            className="bg-blue-400 rounded  text-white hover:bg-blue-500"
            onClick={() => setTarget(null)}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
