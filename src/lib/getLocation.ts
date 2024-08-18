const navigatorLocationOptions = {
  enableHighAccuracy: true,
};

export default function getLocation(): Promise<{ lat: number; long: number }> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        resolve({ lat: latitude, long: longitude });
      },
      (error) => {
        console.log("Error getting current location", error);
        reject(error);
      },
      navigatorLocationOptions
    );
  });
}
