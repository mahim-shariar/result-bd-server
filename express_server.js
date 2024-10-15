const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ExamRecord = require("./models/ExamRecord"); // Model file
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using the MongoDB Atlas connection string
mongoose
  .connect(
    "mongodb+srv://Exam-Result:OQALvM02qhWoL9j2@cluster0.gtkokq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});

// POST route to store examination data
// POST route to store examination data
app.post("/submit", async (req, res) => {
  try {
    // Create a new instance of the ExamRecord model
    const newRecord = new ExamRecord(req.body);

    // Save the new record to the database
    const savedRecord = await newRecord.save();

    // Send the saved record as a response
    res.status(201).json(savedRecord);
  } catch (err) {
    // If there's an error, return the error message with a 400 status
    res.status(400).json({ message: err.message });
  }
});

// GET route to check if the data matches the database record
app.get("/check", async (req, res) => {
  const { exam, year, board, roll, reg } = req.query;

  try {
    // Find the matching record in the database
    const record = await ExamRecord.findOne({ exam, year, board, roll, reg });

    if (record) {
      // If matching data is found, return the record
      res.status(200).json(record);
    } else {
      // If no match is found, return a 404 response
      res.status(404).json({ message: "No matching record found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const port = process.env.PORT || 8080;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;
