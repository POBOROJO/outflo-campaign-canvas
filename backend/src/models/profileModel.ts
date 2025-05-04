import { Schema, model } from "mongoose";

const profileSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  handle: String,
  jobTitle: String,
  company: String,
  location: String,
  profileUrl: String,
  summary: String,
  imageUrl: String,
});

export default model("Profile", profileSchema);
