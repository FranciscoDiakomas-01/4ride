import { useEffect } from "react";
import L, { Map as LeafletMap, Marker, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  from: { lat: number; lng: number };
  to: { lat: number; lng: number };
};

const customFromIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const customToIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function MapComponent({ from, to }: Props) {
  useEffect(() => {
  const map = L.map("map");

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const bounds = L.latLngBounds([from, to]);
  map.fitBounds(bounds, { padding: [50, 50] });

    

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // marcador do ponto de origem
    const fromMarker: Marker = L.marker([from.lat, from.lng], {
      icon: customFromIcon,
    }).addTo(map);
    fromMarker.bindPopup("Origem").openPopup();

    // marcador do ponto de destino
    const toMarker: Marker = L.marker([to.lat, to.lng], {
      icon: customToIcon,
    }).addTo(map);
    toMarker.bindPopup("Destino");



    return () => {
      map.remove();
    };
  }, [from, to]);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "500px", borderRadius: "10px" }}
    />
  );
}
