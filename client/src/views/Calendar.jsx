import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001"; // Usa variable de entorno
const CALENDAR_API = `${API_URL}/api/calendar/eventos`;

function Calendar() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState({
    nombre: "",
    fecha: "",
    descripcion: "",
  });
  const [editEventId, setEditEventId] = useState(null);
  const [editEvent, setEditEvent] = useState({
    nombre: "",
    fecha: "",
    descripcion: "",
  });
  const [error, setError] = useState(null);

  // Función para formatear la fecha para mostrarla
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Cargar eventos al montar el componente
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(CALENDAR_API);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Función para agregar un nuevo evento
  const handleAddEvent = async () => {
    if (!newEvent.nombre || !newEvent.fecha) {
      alert("Por favor, completa los campos requeridos.");
      return;
    }
    try {
      const response = await fetch(CALENDAR_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents([...events, data]);
      setNewEvent({ nombre: "", fecha: "", descripcion: "" }); // Limpiar el formulario
      setIsAdding(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para editar un evento
  const handleEditEvent = async (eventId) => {
    try {
      const response = await fetch(`${CALENDAR_API}/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editEvent),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const updatedEvents = events.map((event) => {
        if (event.id === eventId) {
          return { ...event, ...editEvent }; // Fusiona los cambios
        }
        return event;
      });
      setEvents(updatedEvents);
      setEditEventId(null); // Sale del modo edición
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para eliminar un evento
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      return;
    }

    try {
      const response = await fetch(`${CALENDAR_API}/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para manejar el cambio en los campos del formulario de agregar evento
  const handleNewEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Funciones para manejar el cambio en los campos del formulario de editar evento
  const handleEditEventChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando eventos...
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
      <h2 className="text-2xl font-bold mb-4">Calendario de Eventos</h2>

      {/* Formulario para agregar nuevo evento */}
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        {isAdding ? "Cancelar" : "Agregar Evento"}
      </button>
      {isAdding && (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
          <h3 className="text-lg font-semibold mb-2">Nuevo Evento</h3>
          <div className="mb-2">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={newEvent.nombre}
              onChange={handleNewEventChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="fecha"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha:
            </label>
            <input
              type="datetime-local"
              id="fecha"
              name="fecha"
              value={newEvent.fecha}
              onChange={handleNewEventChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción:
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={newEvent.descripcion}
              onChange={handleNewEventChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <button
            onClick={handleAddEvent}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Evento
          </button>
        </div>
      )}

      {/* Lista de eventos */}
      <ul>
        {events.map((event) => (
          <li key={event.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            {editEventId === event.id ? (
              // Formulario de edición
              <div>
                <div className="mb-2">
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre:
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={editEvent.nombre}
                    onChange={handleEditEventChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="fecha"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha:
                  </label>
                  <input
                    type="datetime-local"
                    id="fecha"
                    name="fecha"
                    value={editEvent.fecha}
                    onChange={handleEditEventChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="descripcion"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descripción:
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={editEvent.descripcion}
                    onChange={handleEditEventChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <button
                  onClick={() => handleEditEvent(event.id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setEditEventId(null)} // Cancelar edición
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              // Vista normal del evento
              <div>
                <h3 className="text-lg font-semibold">{event.nombre}</h3>
                <p className="text-gray-600">{formatDate(event.fecha)}</p>
                {event.descripcion && (
                  <p className="text-gray-700">{event.descripcion}</p>
                )}
                <div className="mt-2">
                  <button
                    onClick={() => {
                      setEditEventId(event.id);
                      setEditEvent({ ...event }); // Carga los datos del evento
                    }}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Calendar;
