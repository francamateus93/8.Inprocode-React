import express from "express";
import { createConnection } from "mysql2/promise";
const router = express.Router();

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "franca3633",
  database: "wellness_app",
};

// get data for graphics
router.get("/graphics", async (req, res) => {
  try {
    const connection = await createConnection(dbConfig);
    const [mostChosenServices] = await connection.execute(
      `SELECT services, COUNT(*) as quantity
            FROM preferences 
            GROUP BY services 
            ORDER BY quantity DESC
            LIMIT 5"
    `
    );

    const [mostChosenLocation] = await connection.execute(
      `SELECT locations, COUNT(*) as quantity
            FROM map 
            GROUP BY locations 
            ORDER BY quantity DESC
            LIMIT 5"
    `
    );
    await connection.end();
    res.json(mostChosenServices, mostChosenLocation);
  } catch (error) {
    console.error("Error getting data:", error);
    res.status(500).json({ message: "Error getting data" });
  }
});

export default router;
