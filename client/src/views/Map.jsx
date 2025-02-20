import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "../../public/images/marker-icon.png";
import markerShadow from "../../public/images/marker-shadow.png";
import LocationForm from "../components/map/LocationForm";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const API_URL = "http://localhost:5001";

function MapComponent() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/map`);
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading map...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Map</h2>

      {/* Location Form */}
      <LocationForm locations={locations} refetchLocations={fetchLocations} />

      {/* Map */}
      <div id="map" className="h-screen rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={[41.2319, 2.1037]}
          zoom={10}
          className="size-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h3 className="text-lg font-semibold">{location.name}</h3>
                  {location.description && (
                    <p className="text-gray-700">{location.description}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComponent;
