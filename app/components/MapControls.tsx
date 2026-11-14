import Search from "./Search";

export default function MapControls({
  averageDelay,
  activeVehicles,
  setTarget,
  target,
  setNotFound,
  notFound,
}: {
  averageDelay: number | undefined;
  activeVehicles: any[];
  setTarget: any;
  target: any;
  setNotFound: (notFound: boolean) => void;
  notFound: boolean;
}) {
  return (
    <div>
      <div className="hidden sm:block absolute top-4 left-4 z-500 rounded-xl bg-white/90 p-3 text-xs">
        <div className="flex flex-row items-center mb-2">
          <img
            src="../../favicon.svg"
            alt="Logo"
            className="w-8 h-8 mr-2 inline-block"
          />
          <p className="text-xl">ÖPNV Tracker</p>
        </div>
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
        <Search
          vehicles={activeVehicles}
          setTarget={setTarget}
          target={target}
          setNotFound={setNotFound}
          notFound={notFound}
        />
      </div>
      <div className="flex items-center sm:hidden absolute top-0 left-0 z-500 w-full bg-white/90 p-3 text-xs">
        <img
          src="../../favicon.svg"
          alt="Logo"
          className="w-8 h-8 mr-2 inline-block"
        />
        <p className="text-xl font-bold">ÖPNV Tracker</p>
      </div>
      // TODO: Add a mobile search bar
    </div>
  );
}
