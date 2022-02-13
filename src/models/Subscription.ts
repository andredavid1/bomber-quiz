import mongoose, { model, models, Schema } from "mongoose";

export const SubscriptionSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true },
    condition: { type: String, required: true },
    discount: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Subscription =
  models.Subscription || model("Subscription", SubscriptionSchema);

export default Subscription;
