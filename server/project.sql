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