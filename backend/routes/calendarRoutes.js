import express, { Router } from "express";
import { db } from "../server.js";

const router = Router();
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, date, time, duration, description FROM calendar"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error getting events:", error);
    res.status(500).json({ message: "Error getting events:" });
  }
});

router.post("/", async (req, res) => {
  const { title, date, time, duration, description } = req.body;
  if (!title || !date || !time || !duration) {
    return res.status(400).json({
      message: "Wrong data. Please provide all valid data.",
    });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO calendar (title, date, time, duration, description) VALUES (?, ?, ?, ?, ?)",
      [title, date, time, duration, description]
    );

    const newEvent = {
      id: result.insertId,
      title,
      date,
      time,
      duration,
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
  const { title, date, time, duration, description } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE calendar SET title = ?, date = ?, time = ?, duration = ?, description = ? WHERE id = ?",
      [title, date, time, duration, description, id]
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
