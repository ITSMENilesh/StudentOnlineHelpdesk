const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/helpdesk")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const QuerySchema = new mongoose.Schema({
  name: String,
  studentId: String,
  email: String,
  issueType: String,
  description: String,
  status: { type: String, default: "Pending" }
});

const Query = mongoose.model("Query", QuerySchema);

// API: Submit Query
app.post("/submit", async (req, res) => {
  const newQuery = new Query(req.body);
  await newQuery.save();
  res.send("Query submitted");
});

// API: Get All Queries
app.get("/queries", async (req, res) => {
  const data = await Query.find();
  res.json(data);
});

// API: Update Status
app.put("/update/:id", async (req, res) => {
  await Query.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.send("Updated");
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});