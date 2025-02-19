import { createPool } from "mysql2/promise";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mapRoutes from "./routes/map.js";
import calendarRoutes from "./routes/calendar.js";
import graphicsRoutes from "./routes/graphics.js";

dotenv.config();
const corsOptions = {
  origin: ["http://localhost:5173"],
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

export const db = createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "franca3633",
  database: process.env.MYSQL_DATABASE || "wellness_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Routes
app.use("/map", mapRoutes);
app.use("/calendar", calendarRoutes);
app.use("/graphics", graphicsRoutes);

app.get("/", async (_req, res) => {
  res.json({ message: "Service is running" });
});

app.post("/users", async (req, res) => {
  try {
    const { full_name, email, phone, location, services } = req.body;
    const [results] = await db.query(
      "INSERT INTO users (full_name, email, phone, location, services) VALUES (?, ?, ?, ?, ?)",
      [full_name, email, phone, location, services]
    );
    res.json({ message: "User add successfully", id: results.insertId });
  } catch (err) {
    console.error("Error adding user:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (_req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Error in SQL query:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { full_name, email, phone, location, services } = req.body;
    const { id } = req.params;
    await db.query(
      "UPDATE users SET full_name = ?, email = ?, phone = ?, location = ?, services = ? WHERE id = ?",
      [full_name, email, phone, location, services, id]
    );
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Initialize server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Service is running on http://localhost:${PORT}`);
});
