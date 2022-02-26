import { useEffect, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

const useCurrentLocation = (options: PositionOptions = {}) => {
  const [error, setError] = useState("");
  const [location, setLocation] = useState({} as Location);

  useEffect(() => {
    // If the geolocation is not defined in the used browser you can handle it as an error
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      // fallback to cairo latitude & longitude in case we can't access user's device geolocation
      setLocation({
        latitude: 30.0444,
        longitude: 31.2357,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, [options]);

  // Success handler for geolocation's `getCurrentPosition` method
  const handleSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Error handler for geolocation's `getCurrentPosition` method
  const handleError = (err: GeolocationPositionError) => {
    // fallback to cairo latitude & longitude in case we can't access user's device geolocation
    setLocation({
      latitude: 30.0444,
      longitude: 31.2357,
    });
    setError(err.message);
  };

  return { location, error };
};

export default useCurrentLocation;
