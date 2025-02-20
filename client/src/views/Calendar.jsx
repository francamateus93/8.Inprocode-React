import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    description: "",
  });
  const [editEventId, setEditEventId] = useState(null);
  const [editEvent, setEditEvent] = useState({
    name: "",
    date: "",
    description: "",
  });
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/calendar`);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    const { name, date, description } = newEvent;

    if (!name || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/calendar`, {
        name,
        date,
        description,
      });

      setEvents([...events, response.data]);
      setNewEvent({ name: "", date: "", description: "" });
      setIsAdding(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditEvent = async (eventId) => {
    try {
      const response = await axios.put(
        `${API_URL}/calendar/${eventId}`,
        editEvent,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedEvents = events.map((event) => {
        if (event.id === eventId) {
          return { ...event, ...editEvent };
        }
        return event;
      });
      setEvents(updatedEvents);
      setEditEventId(null);
    } catch (error) {
      console.error("Error editing events:", error);
      setError(error.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }
    try {
      const response = await axios.delete(`${API_URL}/calendar/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting events:", error);
      setError(error.message);
    }
  };

  const handleNewEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleEditEventChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Events...
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
      <h2 className="text-2xl font-bold mb-4">Calendar of Events</h2>

      {/* Form to add new event */}
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        {isAdding ? "Cancel" : "Add Event"}
      </button>
      {isAdding && (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
          <h3 className="text-lg font-semibold mb-2">New Event</h3>
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
              value={newEvent.name}
              onChange={handleNewEventChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date:
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={newEvent.date}
              onChange={handleNewEventChange}
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
              value={newEvent.description}
              onChange={handleNewEventChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <button
            onClick={handleAddEvent}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Event
          </button>
        </div>
      )}

      {/* List events */}
      <ul>
        {events.map((event) => (
          <li key={event.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            {editEventId === event.id ? (
              // Form Editname
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
                    value={editEvent.name}
                    date
                    onChange={handleEditEventChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date:
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={editEvent.date}
                    onChange={handleEditEventChange}
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
                    value={editEvent.description}
                    onChange={handleEditEventChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <button
                  onClick={() => handleEditEvent(event.id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditEventId(null)} // Cancelar edición
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Normal view
              <div>
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-gray-600">{formatDate(event.date)}</p>
                {event.description && (
                  <p className="text-gray-700">{event.description}</p>
                )}
                <div className="mt-2">
                  <button
                    onClick={() => {
                      setEditEventId(event.id);
                      setEditEvent({ ...event });
                    }}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
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
