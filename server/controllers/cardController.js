// // controllers/cardController.js
// const Card = require("../models/Card");

// const addOrUpdateCard = async (req, res) => {
//   try {
//     const { cardDetails } = req.body;

//     // Find the card in the database by its ID
//     let card = await Card.findOne({ id: cardDetails.id });

//     if (!card) {
//       // If the card does not exist, create a new card
//       card = new Card(cardDetails);
//     } else {
//       // If the card exists, update its properties
//       card.id = cardDetails.id;
//       card.title = cardDetails.title;
//       card.artist = cardDetails.artist;
//       card.thumbnail = cardDetails.thumbnail;
//       card.url = cardDetails.url;
//       card.isFavorite = cardDetails.isFavorite;
//       card.playlists = cardDetails.playlists;
//     }

//     await card.save();
//     res.json({ message: "Card added/updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const getCardById = async (req, res) => {
//   try {
//     const { cardId } = req.params;
//     const card = await Card.findOne({ id: cardId });

//     if (!card) {
//       return res.status(404).json({ error: "Card not found" });
//     }

//     res.json(card);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// module.exports = { addOrUpdateCard, getCardById };
