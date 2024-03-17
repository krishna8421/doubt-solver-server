import mongoose from "mongoose";

const askerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  weakSubject: {
    type: String,
    required: true,
    ref: "Subject",
  },
  isDoubtSolved: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Asker", askerSchema);
