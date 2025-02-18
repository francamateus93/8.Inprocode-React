import { Router } from "express";
import { createConnection } from "mysql2/promise";
const router = Router();

// Configuração da conexão (reutilize isso em todos os arquivos de rotas)
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "franca3633",
  database: "wellness_app",
};

// Rota para obter todas as localizações
router.get("/map", async (req, res) => {
  try {
    const connection = await createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT id, name, latitude, longitude, description FROM map"
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error getting locations:", error);
    res.status(500).json({ message: "Error getting locations:" });
  }
});

router.post("/map", async (req, res) => {
  const { name, latitude, longitude, description } = req.body;
  if (!name || !latitude || !longitude) {
    return res.status(400).json({
      message: "Wrong data. Please provide a valid data.",
    });
  }
  try {
    const connection = await createConnection(dbConfig);
    const [result] = await connection.execute(
      "INSERT INTO map (name, latitude, longitude, description) VALUES (?, ?, ?, ?)",
      [name, latitude, longitude, description]
    );
    await connection.end();

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
    res.status(500).json({ message: "Error creating location:" });
  }
});

router.delete("/map/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute("DELETE FROM map WHERE id = ?", [
      id,
    ]);
    await connection.end();

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
