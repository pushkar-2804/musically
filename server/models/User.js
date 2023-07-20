// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  playlists: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      cards: [{ type: Number, required: true }],
    },
  ],
  favList: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      artist: { type: String, required: true },
      thumbnail: { type: String, required: true },
      url: { type: String, required: true },
      isFavorite: { type: Boolean, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
