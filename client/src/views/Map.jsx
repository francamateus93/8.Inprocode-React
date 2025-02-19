import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "../../public/images/marker-icon.png";
import markerShadow from "../../public/images/marker-shadow.png";

// Solución para el icono de marker (ver más abajo)
if (L.Icon.Default) {
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
}

const API_URL = "http://localhost:5001";

function Map() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: "",
    latitude: "",
    longitude: "",
    description: "",
  });
  const [editLocationId, setEditLocationId] = useState(null);
  const [editLocation, setEditLocation] = useState({
    name: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/map`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Response:", response.data);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleAddLocation = async () => {
    if (!newLocation.name || !newLocation.latitude || !newLocation.longitude) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/map`, newLocation, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchLocations();
      setNewLocation({
        name: "",
        latitude: "",
        longitude: "",
        description: "",
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding location:", error);
      setError(error.message);
    }
  };

  const handleEditLocation = async (locationId) => {
    try {
      const response = await axios.put(
        `${API_URL}/map/${locationId}`,
        editLocation,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchLocations();
      setEditLocationId(null);
    } catch (error) {
      console.error("Error editing locations:", error);
      setError(error.message);
    }
  };

  const handleDeleteLocation = async (locationId) => {
    if (!window.confirm("Are you sure you want to delete this location?")) {
      return;
    }
    try {
      const response = await axios.delete(`${API_URL}/map/${locationId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchLocations();
    } catch (error) {
      console.error("Error deleting locations:", error);
      setError(error.message);
    }
  };

  const handleNewLocationChange = (e) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  const handleEditLocationChange = (e) => {
    setEditLocation({ ...editLocation, [e.target.name]: e.target.value });
  };

  // Helper function to refetch locations
  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${API_URL}/map`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError(error.message);
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

      {/* Form to add a new location */}
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        {isAdding ? "Cancel" : "Add Location"}
      </button>
      {isAdding && (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
          <h3 className="text-lg font-semibold mb-2">New Location</h3>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newLocation.name}
              onChange={handleNewLocationChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude:
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={newLocation.latitude}
              onChange={handleNewLocationChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude:
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={newLocation.longitude}
              onChange={handleNewLocationChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={newLocation.description}
              onChange={handleNewLocationChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <button
            onClick={handleAddLocation}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Location
          </button>
        </div>
      )}

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
            >
              <Popup>
                <div>
                  <h3 className="text-lg font-semibold">{location.name}</h3>
                  {location.description && (
                    <p className="text-gray-700">{location.description}</p>
                  )}

                  {editLocationId === location.id ? (
                    // Edit form inside Popup
                    <div>
                      <div className="mb-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name:
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={editLocation.name}
                          onChange={handleEditLocationChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="latitude"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Latitude:
                        </label>
                        <input
                          type="number"
                          id="latitude"
                          name="latitude"
                          value={editLocation.latitude}
                          onChange={handleEditLocationChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="longitude"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Longitude:
                        </label>
                        <input
                          type="number"
                          id="longitude"
                          name="longitude"
                          value={editLocation.longitude}
                          onChange={handleEditLocationChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description:
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={editLocation.description}
                          onChange={handleEditLocationChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <button
                        onClick={() => handleEditLocation(location.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditLocationId(null)}
                        className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    // Popup view
                    <div>
                      <button
                        onClick={() => {
                          setEditLocationId(location.id);
                          setEditLocation({ ...location });
                        }}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLocation(location.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </div>
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

export default Map;
