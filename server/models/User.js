// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  playlists: { type: [String] },
  favList: { type: [String] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
