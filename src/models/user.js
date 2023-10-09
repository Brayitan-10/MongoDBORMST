import mongoose from "mongoose";
// Schemas
// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // likedPosts arreglo de Posts type ObjectID
});
// User Model
export const User = mongoose.model("User", userSchema);
