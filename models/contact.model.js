import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile_number: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Create Contact model
export default mongoose.model("Contact", contactSchema);
