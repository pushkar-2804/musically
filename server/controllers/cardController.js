// controllers/cardController.js
const Card = require("../models/Card");

const addOrUpdateCard = async (req, res) => {
  try {
    const cardData = req.body;
    const cardId = cardData.id;

    // Find the card in the database by its ID
    let card = await Card.findOne({ id: cardId });

    if (!card) {
      // If the card does not exist, create a new card
      card = new Card(cardData);
    } else {
      // If the card exists, update its properties
      card.title = cardData.title;
      card.artist = cardData.artist;
      card.thumbnail = cardData.thumbnail;
      card.url = cardData.url;
      card.isFavorite = cardData.isFavorite;
      card.playlists = cardData.playlists;
    }

    await card.save();
    res.json({ message: "Card added/updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findOne({ id: cardId });

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addOrUpdateCard, getCardById };
