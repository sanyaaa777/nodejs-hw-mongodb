import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true }, 
  isFavourite: { type: Boolean, default: false },
  contactType: {
    type: String,
    enum: ["personal", "work", "friend"],
    required: true,
  },
}, {
  timestamps: true,
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
