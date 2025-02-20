import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001";

function LocationForm({ locations, setLocations }) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
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

  const handleAddLocation = async () => {
    if (!newLocation.name || !newLocation.latitude || !newLocation.longitude) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      await axios.post(`${API_URL}/map`, newLocation, {
        headers: { "Content-Type": "application/json" },
      });
      setNewLocation({
        name: "",
        latitude: "",
        longitude: "",
        description: "",
      });
      setIsAdding(false);
      refreshLocations();
    } catch (error) {
      console.error("Error adding location:", error);
      setError(error.message);
    }
  };

  const handleEditLocation = async (locationId) => {
    try {
      await axios.put(`${API_URL}/map/${locationId}`, editLocation, {
        headers: { "Content-Type": "application/json" },
      });
      await refetchLocations();
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
      await refetchLocations();
    } catch (error) {
      console.error("Error deleting locations:", error);
      setError(error.message);
    }
  };

  const refetchLocations = async () => {
    try {
      const response = await axios.get(`${API_URL}/map`);
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError(error.message);
    }
  };

  const handleNewLocationChange = (e) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  const handleEditLocationChange = (e) => {
    setEditLocation({ ...editLocation, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        {isAdding ? "Cancel" : "Add Location"}
      </button>
      {isAdding && (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
          <h3 className="text-lg font-semibold mb-2">New Location</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newLocation.name}
            onChange={handleNewLocationChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={newLocation.latitude}
            onChange={handleNewLocationChange}
            className="block w-full p-2 border rounded mt-2"
          />
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={newLocation.longitude}
            onChange={handleNewLocationChange}
            className="block w-full p-2 border rounded mt-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newLocation.description}
            onChange={handleNewLocationChange}
            className="block w-full p-2 border rounded mt-2"
          />
          <button
            onClick={handleAddLocation}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Save Location
          </button>
        </div>
      )}
    </div>
  );
}

export default LocationForm;
