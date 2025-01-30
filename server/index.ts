import express, { type Request, type Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./db/db"; // Ensure db.ts exports the pool correctly
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Use environment variable

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Get all problems
app.get("/problems", async (req: Request, res: Response) => {
  try {
    const problems = await pool.query("SELECT id, title, difficulty FROM problems");
    res.json(problems.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific problem
app.get("/problems/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const problem = await pool.query("SELECT * FROM problems WHERE id = $1", [id]);
    res.json(problem.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a problem
app.post("/problems", async (req: Request, res: Response) => {
  const { id, title, description, difficulty, user_id, category_id } = req.body;
  try {
    const newProblem = await pool.query(
      "INSERT INTO problems (id, title, description, difficulty, user_id, category_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [id, title, description, difficulty, user_id, category_id, new Date(), new Date()]
    );
    res.json(newProblem.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a problem
app.put("/problems/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, difficulty, user_id, category_id } = req.body;
  try {
    const updateProblem = await pool.query(
      "UPDATE problems SET title = $1, description = $2, difficulty = $3, user_id = $4, category_id = $5, updated_at = $6 WHERE id = $7 RETURNING *",
      [title, description, difficulty, user_id, category_id, new Date(), id]
    );
    res.json(updateProblem.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a problem
app.delete("/problems/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM problems WHERE id = $1", [id]);
    res.json({ message: "Problem deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});