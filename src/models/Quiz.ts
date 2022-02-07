import mongoose, { model, models } from "mongoose";

export const QuizSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    questions: [
      { order: Number, id: String, correct: Boolean, answered: String },
    ],
    average: { type: Number, default: 0 },
    finished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Quiz = models.Quiz || model("Quiz", QuizSchema);

export default Quiz;
