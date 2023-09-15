import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';

import axios from "axios";

function MyComponent() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [locationAvailable, setLocationAvailable] = useState(false); // New state for location availability
  const [customerData, setCustomerData] = useState([]); // State to store customer data
  const [requestSent, setRequestSent] = useState(false); // State to track if the request is sent
  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  useEffect(() => {
    // Fetch nearby locations from the server
    if (location.loaded) {
      const { lat, lng } = location.coordinates;
      const maxDistance = 100;
      axios
        .get(`http://localhost:8080/find-closest-customers?latitude=${lat}&longitude=${lng}&maxDistance=${maxDistance}`)
        .then((response) => {
          console.log("Fetched nearby locations:", response.data); 
          setNearbyLocations(response.data);
          setLocationAvailable(true);
        })
        .catch((error) => {
          console.error("Error fetching nearby locations:", error);
        });
    }
  }, [location]);

  const handleSendRequest = () => {
    // Add your logic for sending a request here
    if (locationAvailable && nearbyLocations.some(location => location.status === 1)) {
      // Add your logic to send the request here
      // You can set the requestSent state to true after sending the request
      setRequestSent(true);
    // You can use nearbyLocations and locationAvailable to determine the action
  }
};

  return (
    <div>
      {location.error && <div>Error: {location.error.message}</div>}
      {location.loaded && !location.error && (
        <div>
          <p>Latitude: {location.coordinates.lat}</p>
          <p>Longitude: {location.coordinates.lng}</p>
          <h2>Nearby Locations:</h2>
          <ul>
          {nearbyLocations.map((location) => (
          <li key={location.id}>
            Username: {location.username}, Location: {location.location}
            <Alert severity={location.status === 0 ? "error" : "success"}>
              Status: {location.status === 0 ? "Not Avaliable" : "Avaliable"}
            </Alert>
          </li>
        ))}
          </ul>
        </div>
      )}
     <button
  onClick={handleSendRequest}
  disabled={!locationAvailable || !nearbyLocations.some(location => location.status === 1) || requestSent}
>
  {requestSent ? "Request Sent" : "Send Request"}
</button>
      <div
        className={`location-indicator ${
          locationAvailable ? "available" : "unavailable"
        }`}
      ></div>
    </div>
  );
}

export default MyComponent;
