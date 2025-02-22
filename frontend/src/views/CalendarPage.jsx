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

  const handleEventClick = async ({ event }) => {
    const eventId = event.id;
    if (!eventId) {
      console.error("Invalid event ID:", eventId);
      return;
    }
    try {
      const { data } = await axios.get(`${API_URL}/calendar/${eventId}`);
      setNewEvent({
        id: data.id,
        title: data.title,
        date: data.date,
        time: data.time,
        duration: data.duration,
        description: data.description,
      });
    } catch (error) {
      console.error("Error fetching event:", error);
    }
    setShowModal(true);
    setIsEditMode(true);
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
    console.log(`Editing Event ID: ${id}`);
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
    <div className="container mx-auto w-3/4 px-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        dateClick={handleDateClick}
        eventClick={(info) => handleEventClick(info)}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: false,
        }}
        eventBackgroundColor="#ff9800"
        eventColor="#ff9800"
      />
      {showModal && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-black/70 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md w-1/2">
            <h3 className="text-2xl font-bold mb-4 text-orange-400">
              {isEditMode ? "Edit Event" : "New Event"}
            </h3>
            <form onSubmit={handleSubmit} className="">
              <div className="mb-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-600"
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
                  className="mt-1 p-1 block w-full rounded text-sm text-gray-500 border-gray-300/50 border focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-600"
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
                  className="mt-1 p-1 block w-full rounded text-sm text-gray-500 border-gray-300/50 border focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="mt-1 p-1 block w-full rounded text-sm text-gray-500 border-gray-300/50 border focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <button
                    type="submit"
                    className="bg-orange-400/90 text-white text-lg hover:bg-orange-600/80 px-6 py-3 rounded-md font-medium"
                  >
                    {isEditMode ? "Save" : "Add Event"}
                  </button>
                </div>
                {isEditMode && (
                  <div>
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(newEvent.id)}
                      className="bg-red-500/10 text-red-500 font-medium px-5 py-3 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 text-white px-5 py-3 rounded-md hover:bg-gray-400 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
