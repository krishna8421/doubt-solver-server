import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  strongSubjectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Subject",
  },
  university: { type: String, required: true },

  course: { type: String },
  branch: { type: String },
  cgpa: { type: String },

  rating: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
