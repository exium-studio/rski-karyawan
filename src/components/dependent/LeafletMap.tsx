import { useColorMode, VStack } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

interface LatLng {
  lat: number;
  lng: number;
}

// Props untuk komponen GMaps
interface Props {
  center: LatLng;
  officeCenter: LatLng;
  presence_radius: number;
  zoom?: number;
}

// Hook untuk mengatur peta saat klik
function SetViewOnClick({ center }: { center: LatLng }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function LeafletMap({
  center,
  officeCenter,
  presence_radius,
  zoom = 20,
}: Props) {
  const userIcon = new L.Icon({
    iconUrl: "/vectors/icons/userPin.svg",
    iconSize: [64, 64], // Ukuran ikon
  });

  const officeIcon = new L.Icon({
    iconUrl: "/vectors/icons/hospital.svg",
    iconSize: [64, 64], // Ukuran ikon
  });

  const containerStyle = {
    width: `100vw`,
    height: `100vh`,
  };

  const minZoomLevel = 3; // Tentukan level zoom minimum di sini
  const maxZoomLevel = 18; // Tentukan level zoom maksimum di sini

  // Tentukan batas maksimum yang dapat digeser
  const maxBounds = L.latLngBounds(
    L.latLng(-90, -180), // Batas bawah kiri (selatan barat)
    L.latLng(90, 180) // Batas atas kanan (utara timur)
  );

  const { colorMode } = useColorMode();
  const tileUrl =
    colorMode === "dark"
      ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";

  return (
    <VStack position="fixed" left={0} top={0}>
      <MapContainer
        //@ts-ignore
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={containerStyle as any}
        minZoom={minZoomLevel}
        maxZoom={maxZoomLevel}
        maxBounds={maxBounds}
        maxBoundsViscosity={1.0} // Biarkan peta memantul ketika mencapai batas
      >
        <TileLayer url={tileUrl} />

        <Marker
          position={[center.lat, center.lng]}
          //@ts-ignore
          icon={userIcon}
        />

        <Marker
          position={[officeCenter.lat, officeCenter.lng]}
          //@ts-ignore
          icon={officeIcon}
        />

        {/* Marker kantor */}
        <Circle
          center={[officeCenter.lat, officeCenter.lng]}
          //@ts-ignore
          radius={presence_radius} // Radius dalam meter
          pathOptions={{
            color: "#16b3ac", // Warna garis lingkaran
            fillColor: "#16b3ac", // Warna isi lingkaran
            fillOpacity: 0.35, // Opasitas isi lingkaran
          }}
        />
        <SetViewOnClick center={center} />
      </MapContainer>
    </VStack>
  );
}
