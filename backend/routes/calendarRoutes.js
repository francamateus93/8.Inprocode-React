import express, { Router } from "express";
import { db } from "../server.js";

const router = Router();
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, date, description FROM calendar"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error getting events:", error);
    res.status(500).json({ message: "Error getting events:" });
  }
});

router.post("/", async (req, res) => {
  const { name, date, description } = req.body;
  if (!name || !date) {
    return res.status(400).json({
      message: "Wrong data. Please provide all valid data.",
    });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO calendar (name, date, description) VALUES (?, ?, ?)",
      [name, date, description]
    );

    const newEvent = {
      id: result.insertId,
      name,
      date,
      description,
    };
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Error creating event" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, description } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE calendar SET name = ?, date = ?, description = ? WHERE id = ?",
      [name, date, description, id]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Event updated successfully" });
    } else {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Error updating event:" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM calendar WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Error deleting event:" });
  }
});

export default router;
