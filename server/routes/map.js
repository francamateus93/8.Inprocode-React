import express, { Router } from "express";
import { createPool } from "mysql2/promise";
import cors from "cors";
const router = Router();

router.use(cors({ origin: "http://localhost:5173" }));
router.use(express.json());

export const db = createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "franca3633",
  database: process.env.MYSQL_DATABASE || "wellness_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, latitude, longitude, description FROM map"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error getting locations:", error);
    res.status(500).json({ message: "Error getting locations:" });
  }
});

router.post("/", async (req, res) => {
  const { name, latitude, longitude, description } = req.body;
  if (!name || !latitude || !longitude) {
    return res.status(400).json({
      message: "Wrong data. Please provide all valid data.",
    });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO map (name, latitude, longitude, description) VALUES (?, ?, ?, ?)",
      [name, latitude, longitude, description]
    );

    const newLocation = {
      id: result.insertId,
      name,
      latitude,
      longitude,
      description,
    };
    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error creating location:", error);
    res.status(500).json({ message: "Error creating location" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM map WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      res.json({ message: "Location deleted successfully" });
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  } catch (error) {
    console.error("Error deleting location:, error");
    res.status(500).json({ message: "Error deleting location:" });
  }
});

export default router;
