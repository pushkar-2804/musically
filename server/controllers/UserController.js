// controllers/userController.js
const User = require("../models/User");

// Middleware to handle errors
const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
};

// Controller to add or update playlists and/or favList for a user
const addOrUpdateLists = async (req, res) => {
  try {
    const { userId, playlists, favList } = req.body;
    let user = await User.findOne({ userId });

    if (!user) {
      // Create a new user if not found
      user = new User({ userId, playlists, favList });
    } else {
      // Update the arrays if user already exists
      if (playlists) user.playlists = playlists;
      if (favList) user.favList = favList;
    }

    await user.save();
    res.json({ message: "Lists added/updated successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Controller to get playlists for a user
const getPlaylistsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.playlists);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Controller to get favList for a user
const getFavListByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.favList);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = { addOrUpdateLists, getPlaylistsByUserId, getFavListByUserId };
