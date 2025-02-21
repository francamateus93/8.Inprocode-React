import React from "react";

const CalendarList = ({ events }) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold">{event.name}</h3>
          <p className="text-gray-600">{event.date}</p>
          {event.description && (
            <p className="text-gray-700">{event.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CalendarList;
