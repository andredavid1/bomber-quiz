import mongoose, { model, models, Schema } from "mongoose";

export const QuestionSchema = new mongoose.Schema(
  {
    discipline: {
      type: Schema.Types.ObjectId,
      ref: "Discipline",
      required: true,
    },
    statement: { type: String, required: true },
    difficult: { type: String, default: "medium" },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer", required: true }],
  },
  { timestamps: true, collection: "questions" }
);

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
