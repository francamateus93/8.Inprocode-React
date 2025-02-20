import express, { Router } from "express";
import { db } from "../server.js";

const router = Router();
router.use(express.json());

router.get("/services", async (_req, res) => {
  try {
    const [rows, fields] = await db.query(
      "SELECT services, COUNT(*) as count FROM users GROUP BY services"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error in SQL query:", err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/locations", async (_req, res) => {
  try {
    const [rows, fields] = await db.query(
      "SELECT location, COUNT(*) as count FROM users GROUP BY location"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error in SQL query:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
