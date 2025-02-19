CREATE DATABASE wellness_app;
USE wellness_app;

-- Users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  location VARCHAR(100),
  services TEXT
);

INSERT INTO users (full_name, email, phone, location, services)
VALUES
  ("John Doe", "john@example.com", "123-456-7890", "Los Angeles, USA", "Massage"),
  ("Carl Gallager", "carlgallager@example.com", "123-456-7890", "New York, USA", "Haircut, Massage");

-- Locations
CREATE TABLE map (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 6) NOT NULL,
  longitude DECIMAL(10, 6) NOT NULL,
  description TEXT,
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO map (name, latitude, longitude, description)
VALUES
(
  "Barcelona",
  41.3828,
  2.1774,
  "Description for Barcelona"
);

-- Calendar
CREATE TABLE calendar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  description TEXT
);

INSERT INTO calendar (name, date, description)
VALUES
(
  "Massage Session",
  "2023-06-01",
  "Appointment with Massage Therapist in Nature Energy Massage, Barcelona."
);
