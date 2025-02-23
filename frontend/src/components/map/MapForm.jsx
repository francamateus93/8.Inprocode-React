import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001";

const MapForm = ({ locations, setLocations }) => {
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
      refetchLocations();
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
      await axios.delete(`${API_URL}/map/${locationId}`);
      await refetchLocations();
    } catch (error) {
      console.error("Error deleting locations:", error);
      setError(error.message);
    }
  };

  const refetchLocations = async () => {
    try {
      const data = await axios.get(`${API_URL}/map`);
      setLocations(data);
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
        className="bg-orange-400/90 text-white text-lg hover:bg-orange-500/80 px-4 py-2 mt-3 rounded font-medium"
      >
        {isAdding ? "Cancel" : "Add Location"}
      </button>
      {isAdding && (
        <div className="mb-4 p-6 mx-auto rounded-xl my-2 transition duration-200 hover:shadow-lg">
          <h3 className="text-xl font-bold mb-2 text-orange-400">
            New Location
          </h3>
          {["Name", "Latitude", "Longitude"].map((field) => (
            <input
              key={field}
              className="border border-gray-300/50 shadow-xs text-gray-500 text-sm p-2 m-1 ml-0 rounded-md flex w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              type={field === "number" ? "number" : "text"}
              name={field}
              placeholder={field.replace("_", " ")}
              value={newLocation[field]}
              onChange={handleNewLocationChange}
              required
            />
          ))}
          <textarea
            name="description"
            placeholder="Description"
            value={newLocation.description}
            onChange={handleNewLocationChange}
            className="border border-gray-300/50 shadow-xs text-gray-500 text-sm p-2 m-1 ml-0 rounded-md block w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={handleAddLocation}
            className="bg-orange-400 text-white font-medium px-6 py-3 rounded-md mt-4 text-lg hover:bg-orange-600/80 hover:text-white transition duration-300"
          >
            Save Location
          </button>
        </div>
      )}
    </div>
  );
};

export default MapForm;
