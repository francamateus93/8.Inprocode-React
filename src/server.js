import mysql from "mysql2";
import express, { json } from "express";
import cors from "cors";

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
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get users by Id
app.get("/users:id", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE Id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0)
        return res.status(404).json({ message: "User not found" });
      res.json(result[0]);
    }
  );
});

// Add new user
app.post("/users", (req, res) => {
  const { username, email } = req.body;
  db.query(
    "INSERT INTO users (username, email) VALUES (?, ?)",
    [username, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, username, email });
    }
  );
});

// Delete user
app.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted" });
  });
});

// Port Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`This is the server: http://localhost:${PORT}`);
});
