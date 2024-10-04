// models/ExamRecord.js

const mongoose = require("mongoose");

const examRecordSchema = new mongoose.Schema({
  exam: { type: String, required: true },
  year: { type: Number, required: true },
  board: { type: String, required: true },
  roll: { type: String, required: true, unique: true },
  reg: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  group: { type: String, required: true },
  result: { type: String, required: true },
  gpa: { type: Number, required: true },
  institute: { type: String, required: true },
  dob: { type: Date, required: false },
  grades: {
    bangla: { code: { type: String }, grade: { type: String } },
    english: { code: { type: String }, grade: { type: String } },
    ict: { code: { type: String }, grade: { type: String } },
    physics: { code: { type: String }, grade: { type: String } },
    chemistry: { code: { type: String }, grade: { type: String } },
    biology: { code: { type: String }, grade: { type: String } },
    math: { code: { type: String }, grade: { type: String } },
  },
});

const ExamRecord = mongoose.model("ExamRecord", examRecordSchema);

module.exports = ExamRecord;
