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
  ("Marcia Porto", "marciaporto@gmail.com", "641154121", "Barcelona, Spain", "Massage"),
  ("Carl Gallager", "carlgallager@hotmail.com", "9334787790", "New York, USA", "Haircut"),
  ("Raul Garcia", "raulgarcia@gmail.com", "647184789", "Barcelona, Spain", "Massage");
  ("Joana Oliveira", "joliveira@gmail.com", "635587458", "Lisbon, Portugal", "Beauty session");


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
  "Nature Energy Massage",
  41.40568,
  2.15523,
  "Nature Energy Massage was created with the mission of delivering massage services with the best quality possible, always seeking that clients have a great experience in our space."
);
(
  "Thai Spa",
  41.39587,
  2.16111,
  ""
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
