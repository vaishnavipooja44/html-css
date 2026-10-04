const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Student CRUD API is running",
    students: "/students"
  });
});

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

app.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/students", async (req, res) => {
  try {
    res.json(await Student.find().sort({ createdAt: -1 }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: "Invalid student ID" });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted", student });
  } catch (error) {
    res.status(400).json({ error: "Invalid student ID" });
  }
});

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/college";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`API running at http://localhost:${port}`));
  })
  .catch((error) => {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  });
