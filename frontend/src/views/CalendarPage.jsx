import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const API_URL = "http://localhost:5001";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    description: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

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

  const addEventToCalendar = async (eventData) => {
    try {
      const response = await axios.post(`${API_URL}/calendar`, eventData);
      const newEvents = [...events, response.data];
      setEvents(newEvents);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${API_URL}/calendar/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEditEvent = async (eventId, eventData) => {
    try {
      await axios.put(`${API_URL}/calendar/${eventId}`, eventData);
      const updatedEvents = events.map((event) => {
        if (event.id === eventId) {
          return { ...event, ...eventData };
        }
        return event;
      });
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  const handleEventClick = (info) => {
    const eventId = info.event.id;
    const event = events.find((event) => event.id === eventId);
    if (event) {
      setNewEvent({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        duration: event.duration,
        description: event.description,
      });
      setShowModal(true);
      setIsEditMode(true);
    }
  };

  const handleDateClick = (arg) => {
    setNewEvent({
      id: null,
      title: "",
      date: arg.date.toISOString().split("T")[0],
      time: "",
      duration: "",
      description: "",
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, date, time, description, id } = newEvent;
    if (!title || !time) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      if (isEditMode) {
        handleEditEvent(id, {
          title,
          date,
          time,
          duration: newEvent.duration,
          description,
        });
      } else {
        const eventData = {
          title,
          date,
          time,
          duration: newEvent.duration,
          description,
        };
        await addEventToCalendar(eventData);
      }
      setNewEvent({
        id: null,
        title: "",
        date: "",
        time: "",
        duration: "",
        description: "",
      });
      setIsEditMode(false);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding or editing event:", error);
    }
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
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      {showModal && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md w-1/2">
            <h3 className="text-lg font-semibold mb-2">
              {isEditMode ? "Edit Event" : "New Event"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time:
                </label>
                <input
                  type="time"
                  id="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
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
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(newEvent.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {isEditMode ? "Save Changes" : "Add Event"}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
