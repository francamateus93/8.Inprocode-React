import React, { useState } from "react";

const CalendarForm = ({
  events,
  addEventToCalendar,
  handleDeleteEvent,
  handleEditEvent,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    description: "",
  });
  const [editEvent, setEditEvent] = useState({
    name: "",
    date: "",
    description: "",
  });
  const [editEventId, setEditEventId] = useState(null);
  const [error, setError] = useState(null);

  const addEvent = async () => {
    const { name, date, description } = newEvent;
    console.log("Attempting to add event:", newEvent);
    if (!name || !date) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      await addEventToCalendar({
        name,
        date,
        description,
      });
      console.log("Event added successfully");
      setNewEvent({ name: "", date: "", description: "" });
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding event:", error);
      setError(error.message);
    }
  };

  const handleDeleteEventForm = (eventId) => {
    handleDeleteEvent(eventId);
  };

  const handleEditEventForm = async (event) => {
    try {
      await handleEditEvent(eventId, editEvent);
      setEditEventId(null);
    } catch (error) {
      console.error("Error editing events:", error);
      setError(error.message);
    }
  };

  const handleNewEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleEditEventChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Form to add new event */}
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
        disabled={false}
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
              className="block text-sm font-medium textfcn-700"
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
            onClick={addEvent}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Event
          </button>
        </div>
      )}
      {events.map((event) => (
        <div key={event.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          {editEventId === event.id ? (
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
                  className="mt-1 block w-full rounded-md border-gray-375 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                  className="mt-1 block w-full rounded-md border-gray-375 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <button
                onClick={() => handleEditEventForm(event)}
                className="bg-green-300 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditEventId(null)} // Cancelar edición
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p className="text-gray-600">{event.date}</p>
              {event.description && (
                <p className="text-gray-700">{event.description}</p>
              )}
              <div className="mt-2">
                <button
                  onClick={() => {
                    setEditEventId(event.id);
                    setEditEvent(event);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEventForm(event.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CalendarForm;
