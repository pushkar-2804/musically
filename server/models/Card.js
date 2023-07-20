// models/card.js
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  thumbnail: { type: String, required: true },
  url: { type: String, required: true },
  isFavorite: { type: Boolean, required: true },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
