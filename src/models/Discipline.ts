import mongoose, { model, models } from "mongoose";

export const DisciplineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Discipline = models.Discipline || model("Discipline", DisciplineSchema);

export default Discipline;
