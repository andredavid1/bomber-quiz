import mongoose, { model, models, Schema } from "mongoose";

export const AnswerSchema = new mongoose.Schema({
  value: { type: String, required: true },
  correct: { type: Boolean, required: true },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
