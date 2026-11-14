import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function FlyController({
  target,
  zoom,
}: {
  target: [number, number] | null;
  zoom?: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target, zoom ?? 18, { duration: 1.2 });
    } else {
      map.flyTo([48.397798, 9.990832], 13, { duration: 1.2 });
    }
  }, [target, map]);
  return null;
}
