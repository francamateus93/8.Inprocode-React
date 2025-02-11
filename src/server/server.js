require("dotenv").config();

import { createConnection } from "mysql";
import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

// Database MySQL
const db = createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Connection
db.connect((error) => {
  if (error) {
    console.error("Error in MySQL:", error);
    return;
  }
  console.log("Connected to MySQL");
});

// Testing
app.get("/", (req, res) => {
  res.send("API Working");
});

// Port Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`This is the server: http://localhost:${PORT}`);
});
