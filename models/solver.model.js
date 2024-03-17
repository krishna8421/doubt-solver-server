import mongoose from "mongoose";

const solverSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  strongSubject: {
    type: String,
    required: true,
    ref: "Subject",
  },
});

export default mongoose.model("Solver", solverSchema);
