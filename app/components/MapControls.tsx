import Search from "./Search";

export default function MapControls({
  averageDelay,
  activeVehicles,
  setTarget,
  target,
  setNotFound,
  notFound,
  setIsSearchOpen,
  isSearchOpen,
}: {
  averageDelay: number | undefined;
  activeVehicles: any[];
  setTarget: any;
  target: any;
  setNotFound: (notFound: boolean) => void;
  notFound: boolean;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  isSearchOpen: boolean;
}) {
  return (
    <div className="absolute top-0 left-0 z-500 w-full h-full pointer-events-none">
      <div className="pointer-events-auto hidden sm:block absolute top-4 left-4 z-500 rounded-xl bg-white/90 p-3 text-xs">
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
          setIsSearchOpen={setIsSearchOpen}
          isSearchOpen={isSearchOpen}
        />
      </div>
      <div className="pointer-events-auto flex items-center sm:hidden absolute top-0 left-0 z-500 w-full bg-white/90 p-3 text-xs">
        <img
          src="../../favicon.svg"
          alt="Logo"
          className="w-8 h-8 mr-2 inline-block"
        />
        <p className="text-xl font-bold">ÖPNV Tracker</p>
      </div>
      {!isSearchOpen ? (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSearchOpen(true);
            }}
            aria-label="Suche öffnen"
            className=" pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 z-500  sm:hidden bg-white/50 backdrop-blur-sm p-2 rounded-full flex items-center gap-2 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
            <p className="font-semibold">Suche</p>
          </button>
          {target && (
            <button
              onClick={() => (setTarget(null), setNotFound(false))}
              className="pointer-events-auto absolute bottom-8 right-4 z-500 text-red-700 sm:hidden  bg-red-500/50 backdrop-blur-sm p-2 rounded-full flex items-center gap-2 shadow-md"
            >
              Reset
            </button>
          )}
        </>
      ) : (
        <>
          <div
            onClick={() => setIsSearchOpen(false)}
            className="pointer-events-auto absolute inset-0 bg-black/20"
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto absolute left-1/13 right-1/13 z-500 top-2/9 bottom-3/9 rounded-xl sm:hidden bg-white/50 backdrop-blur-sm p-2 flex"
          >
            <Search
              vehicles={activeVehicles}
              setTarget={setTarget}
              target={target}
              setNotFound={setNotFound}
              notFound={notFound}
              setIsSearchOpen={setIsSearchOpen}
              isSearchOpen={isSearchOpen}
            />
          </div>
        </>
      )}
    </div>
  );
}
