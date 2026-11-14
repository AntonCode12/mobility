import { findVehiclePostionData } from "../lib/vehicles";

export default function Search({
  vehicles,
  setTarget,
  target,
  setNotFound,
  notFound,
}: {
  vehicles: any[];
  setTarget: any;
  target: any;
  setNotFound: (notFound: boolean) => void;
  notFound: boolean;
}) {
  return (
    <div>
      <div className="flex flex-row">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const PostionData = findVehiclePostionData(
              e.currentTarget.vehicleNumberInput.value,
              vehicles,
            );
            if (PostionData) {
              setTarget([PostionData.Latitude, PostionData.Longitude]);
              setNotFound(false);
            } else {
              setNotFound(true);
            }

            console.log(PostionData);
          }}
        >
          <input
            type="text"
            placeholder="Fahrzeugnummer"
            id="vehicleNumberInput"
            className="border border-gray-300 rounded-md p-1 mr-2 my-2"
          />
          {!target && !notFound && (
            <button
              type="submit"
              className="font-bold text-blue-700 hover:bg-blue-400 bg-blue-300 rounded-md p-1 mr-2 my-2"
            >
              Suchen
            </button>
          )}
        </form>

        {(target || notFound) && (
          <button
            className="font-bold text-red-700 hover:bg-red-400 bg-red-300 rounded-md p-1 mr-2 my-2"
            onClick={() => (setTarget(null), setNotFound(false))}
          >
            Reset
          </button>
        )}
      </div>
      {notFound && (
        <p className="text-red-700 font-bold mr-2 my-2">
          Fahrzeug nicht gefunden
        </p>
      )}
    </div>
  );
}
