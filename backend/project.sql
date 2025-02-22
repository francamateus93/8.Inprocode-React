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
  ("Marcia Porto", "marciaporto@gmail.com", "641154121", "Barcelona", "Massage"),
  ("Carl Gallager", "carlgallager@hotmail.com", "9334787790", "New York", "Haircut"),
  ("Raul Garcia", "raulgarcia@gmail.com", "647184789", "Barcelona", "Massage"),
  ("Joana Oliveira", "joliveira@gmail.com", "635587458", "Lisbon", "Beauty session"),
  ("Mateus Franca", "mateusfranca@gmail.com", "688181289", "Rio de Janeiro", "Haircut");


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
  "Nature Energy Massage is a massage center located in the Gracia neighborhood of Barcelona."
),
(
  "Thai Spa",
  41.39587,
  2.16111,
  "Thai Spa is an environment focused on Thai therapies."
),
(
  "Saloon de Belleza",
  41.39968,
  2.17111,
  "Salón de Belleza is a beauty salon located in Barcelona."
),
(
  "Pelluqueria Kamal",
  41.40568,
  2.15523,
  "Kamal Barber is a barber shop specializing in haircuts."
);

-- Calendar
CREATE TABLE calendar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration TIME NOT NULL,
  description TEXT
);

INSERT INTO calendar (title, date, time, duration, description)
VALUES
('Haircut', '2025-02-04', '10:00:00', '01:00:00', 'Appointment with Hairdresser at 10am.'),
('Beauty', '2025-02-10', '16:00:00', '01:30:00', 'Appointment with Beauty Therapist to improve skin tone.'),
('Massage', '2025-02-20', '12:00:00', '01:30:00', 'Appointment with Massage Therapist at Nature Energy Massage.'),
('Massage', '2025-02-06', '12:00:00', '01:30:00', 'Appointment with Massage Therapist at Nature Energy Massage.');

