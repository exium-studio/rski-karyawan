import { VStack } from "@chakra-ui/react";
import {
  Circle,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback } from "react";

interface Props {
  center: { lat: number; lng: number };
  officeCenter: { lat: number; lng: number };
  zoom: number;
  presence_radius: number;
}

export default function GMaps({
  center,
  officeCenter,
  presence_radius,
  zoom,
}: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBtzPbevaLoWycQ3f07Ooctf_R0XtEOo-Q",
  });

  // const [map, setMap] = useState<google.maps.Map | null>(null); // Tipe data tambahan di sini
  // console.log(map);

  const onLoad = useCallback(function callback(map: any) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    // setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    // setMap(null);
  }, []);

  // SX
  const containerStyle = {
    width: `100vw`,
    height: `100vh`,
  };

  const officeIcon = {
    url: "/vectors/icons/hospital.svg", // Atur URL gambar pin
  };

  return isLoaded ? (
    <VStack position={"fixed"} left={0} top={0}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true, // Menonaktifkan tampilan kontrol default
          zoomControl: false, // Menonaktifkan kontrol zoom
          streetViewControl: false, // Menonaktifkan kontrol street view
          fullscreenControl: false, // Menonaktifkan tombol full screen
          gestureHandling: "cooperative", // Menetapkan gestureHandling ke cooperative
        }}
      >
        <Marker position={center} />

        <Marker position={officeCenter} icon={officeIcon}>
          <Circle
            center={officeCenter}
            radius={presence_radius} // Radius dalam meter
            options={{
              strokeColor: "#16b3ac", // Warna garis lingkaran
              strokeOpacity: 0.8, // Opasitas garis lingkaran
              strokeWeight: 2, // Ketebalan garis lingkaran
              fillColor: "#16b3ac", // Warna isi lingkaran
              fillOpacity: 0.35, // Opasitas isi lingkaran
            }}
          />
        </Marker>
      </GoogleMap>
    </VStack>
  ) : (
    <></>
  );
}
