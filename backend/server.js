import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path : '.env'});
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
}, { timestamps: true });

const Task = mongoose.model("Task", TaskSchema);

// CRUD Routes
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.put("/api/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
