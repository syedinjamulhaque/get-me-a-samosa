import mongoose from "mongoose"

const { Schema, model } = mongoose

const PaymentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    to_user: { type: String, required: true, index: true },
    oid: { type: String, required: true, unique: true },
    message: { type: String, trim: true, default: "" },
    amount: { type: Number, required: true }, // in rupees
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.models.Payment || model("Payment", PaymentSchema)