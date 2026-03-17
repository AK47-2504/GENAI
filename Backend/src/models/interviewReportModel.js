const mongoose = require("mongoose");

const technicalQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical Question is Required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is Required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is Required"],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical Question is Required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is Required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is Required"],
    },
  },
  {
    _id: false,
  },
);

const skillGapsSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skils are Required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is Required"],
  },
  tasks: [
    {
      type: String,
      required: [true, "Task is Required"],
    },
  ],
});

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Job Description is Required"],
  },
  resume: {
    type: String,
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  technicalQuestions: [technicalQuestionsSchema],
  behavioralQuestions: [behavioralQuestionSchema],
  skillGaps: [skillGapsSchema],
  preparationPlan: [preparationPlanSchema],
});

const interviewReportModel = mongoose.model(
  "interviewReport",
  interviewReportSchema,
);

module.exports = interviewReportModel;
