import express, { Router } from "express";
import { db } from "../server.js";

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
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

router.get("/", async (_req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Error in SQL query:", err);
    return res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
