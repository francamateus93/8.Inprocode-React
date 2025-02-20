import { createPool } from "mysql2/promise";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import mapRoutes from "./routes/mapRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import graphicsRoutes from "./routes/graphicsRoutes.js";

dotenv.config();
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
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

app.use("/map", mapRoutes);
app.use("/calendar", calendarRoutes);
app.use("/graphics", graphicsRoutes);
app.use("/users", userRoutes);

app.get("/", async (_req, res) => {
  res.json({ message: "Service is running" });
});

// Initialize server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Service is running on http://localhost:${PORT}`);
});

export default app;
