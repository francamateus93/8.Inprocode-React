import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarForm from "../components/calendar/CalendarForm";

const API_URL = "http://localhost:5001";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const addEventToCalendar = async (eventData) => {
    try {
      const response = await axios.post(`${API_URL}/calendar`, eventData);
      setEvents([...events, response.data]);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Events...
      </div>
    );
  }

  return (
    <div>
      <CalendarForm
        events={events}
        addEventToCalendar={addEventToCalendar}
        handleDeleteEvent={handleDeleteEvent}
        handleEditEvent={handleEditEvent}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
      />
    </div>
  );
};

export default CalendarPage;
