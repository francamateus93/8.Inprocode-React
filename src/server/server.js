import mysql from "mysql2";
import express, { json } from "express";
import cors from "cors";

const router = express.Router();

// Config. variables
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connection
db.connect((err) => {
  if (err) {
    console.error("Error in MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Get users
router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add new user
router.post("/users", (req, res) => {
  const { full_name, email, phone, location, services } = req.body;
  db.query(
    "INSERT INTO users (full_name, email, phone, location, services) VALUES (?, ?, ?, ?, ?)",
    [full_name, email, phone, location, services],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User created successfully", id: result.insertId });
    }
  );
});

// Update user
router.get("/users:id", (req, res) => {
  const { full_name, email, phone, location, services } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE users SET full_name = ?, email = ?, phone = ?, location = ?, services = ? WHERE id = ?",
    [full_name, email, phone, location, services],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User updated successfully" });
    }
  );
});

// Delete user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully" });
  });
});

// Port Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`This is the server: http://localhost:${PORT}`);
});

export default router;
