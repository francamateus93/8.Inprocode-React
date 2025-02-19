import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css"; // Importa el CSS de Leaflet
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
// const MAP_API = `${API_URL}/map`;

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

  // Carga las ubicaciones al montar el componente
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/map`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Función para agregar una nueva ubicación
  const handleAddLocation = async () => {
    if (!newLocation.name || !newLocation.latitude || !newLocation.longitude) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/map`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLocations([...locations, ...response.data]);
      setNewLocation({
        name: "",
        latitude: "",
        longitude: "",
        description: "",
      });
      setIsAdding(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para editar una ubicación
  const handleEditLocation = async (locationId) => {
    try {
      const response = await axios.put(`${API_URL}/map/${locationId}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const updatedLocations = locations.map((location) => {
        if (location.id === locationId) {
          return { ...location, ...response.data };
        }
        return location;
      });
      setLocations(updatedLocations);
      setEditLocationId(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para eliminar una ubicación
  const handleDeleteLocation = async (locationId) => {
    if (!window.confirm("Are you sure you want to delete this location?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/map/${locationId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLocations(locations.filter((location) => location.id !== locationId));
    } catch (error) {
      setError(error.message);
    }
  };

  // Funciones para manejar el cambio en los campos del formulario
  const handleNewLocationChange = (e) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };
  const handleEditLocationChange = (e) => {
    setEditLocation({ ...editLocation, [e.target.name]: e.target.value });
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
        {isAdding ? "Cancelar" : "Agregar Ubicación"}
      </button>
      {isAdding && (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
          <h3 className="text-lg font-semibold mb-2">New Location</h3>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              name:
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
            Guardar Ubicación
          </button>
        </div>
      )}

      {/* Map */}
      <div className="h-96 rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
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
                    // Formulario de edición dentro del Popup
                    <div>
                      <div className="mb-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          name:
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
                        Guardar Cambios
                      </button>
                      <button
                        onClick={() => setEditLocationId(null)} // Cancelar edición
                        className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    // Vista normal del Popup
                    <div>
                      <button
                        onClick={() => {
                          setEditLocationId(location.id);
                          setEditLocation({ ...location }); // Carga los datos
                        }}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteLocation(location.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Eliminar
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
