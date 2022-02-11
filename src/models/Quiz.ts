import mongoose, { model, models, Schema } from "mongoose";

export const QuizSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    questions: [
      { type: Schema.Types.ObjectId, ref: "Question", required: true },
    ],
    complementQuestionsQuiz: [
      {
        levelQuestion: String,
        questionRight: Boolean,
        selectedAnswerOption: String,
      },
    ],
    average: { type: Number, default: 0 },
    finished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Quiz = models.Quiz || model("Quiz", QuizSchema);

export default Quiz;
