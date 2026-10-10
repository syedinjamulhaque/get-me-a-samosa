import mongoose from "mongoose"

const { Schema, model } = mongoose

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, trim: true },
    profilepic: { type: String, trim: true },
    coverpic: { type: String, trim: true },
    razorpayid: { type: String, trim: true },
    razorpaysecret: { type: String, select: false },
  },
  { timestamps: true }
)

export default mongoose.models.User || model("User", UserSchema)