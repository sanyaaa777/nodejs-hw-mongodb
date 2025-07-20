import mongoose from "mongoose";

const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  isFavourite: { type: Boolean, default: false },
  contactType: { type: String, enum: ["work", "friend", "family"], default: "work" },
});

export default model("Contact", contactSchema);
