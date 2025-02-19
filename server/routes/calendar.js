import express from "express";
import { createConnection } from "mysql2/promise";
const router = express.Router();

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "franca3633",
  database: "wellness_app",
};

router.post("/calendar", async (req, res) => {
  const { name, date, description } = req.body;
  if (!name || !date) {
    return res.status(400).json({
      message: "Wrong data. Please provide all valid data.",
    });
  }
  try {
    const connection = await createConnection(dbConfig);
    const [result] = await connection.execute(
      "INSERT INTO calendar (name, date, description) VALUES (?, ?, ?)",
      [name, date, description]
    );
    await connection.end();

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

// edit event
router.put("/calendar/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, description } = req.body;
  try {
    const connection = await createConnection(dbConfig);
    const [result] = await connection.execute(
      "UPDATE calendar SET name = ?, date = ?, description = ? WHERE id = ?",
      [name, date, description, id]
    );
    await connection.end();
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

router.delete("/calendar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await createConnection(dbConfig);
    const [result] = await connection.execute(
      "DELETE FROM calendar WHERE id = ?",
      [id]
    );
    await connection.end();
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
