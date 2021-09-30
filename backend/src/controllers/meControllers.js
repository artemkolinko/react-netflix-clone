/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {Show} = require('../models/Show');

// GET /api/v1/users/me
const getProfileInfo = async (req, res) => {
  const {userId} = req.user;

  try {
    const user = await User.findById(userId, '-password -__v -updatedAt');

    if (!user) {
      return res.status(400).json({message: `User not found`});
    }

    res.json({user});
  } catch (error) {
    res.status(500).json({message: 'Server error'});
  }
};

// DELETE /api/v1/users/me
const deleteProfile = async (req, res) => {
  const {userId} = req.user;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(400).json({message: `User not found`});
    }
    res.json({message: 'Profile deleted successfully'});
  } catch (error) {
    res.status(500).json({message: 'Server error'});
  }
};

// PATCH /api/v1/users/me/password
const changeProfilePassword = async (req, res) => {
  const {userId} = req.user;
  const {oldPassword, newPassword} = req.body;

  if (!oldPassword) {
    return res.status(400).json({message: 'Provide oldPassword'});
  }
  if (!newPassword) {
    return res.status(400).json({message: 'Provide newPassword'});
  }

  if (oldPassword === newPassword) {
    return res.status(400).json({message: 'Passwords are the same'});
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({message: `User not found`});
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      // throw new Error('Invalid password');
      return res.status(400).json({message: 'Invalid password'});
    }

    user.password = newPassword;

    // await User.findByIdAndUpdate(user._id, {password: newPassword});
    // Use doc.save() to activate 'save' pre hook
    await user.save();

    res.json({message: 'Password changed successfully'});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// GET /users/me/favorites
const getShowFavorites = async (req, res) => {
  const {userId} = req.user;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({message: `User not found`});
    }

    const {favorites} = user;
    const shows = await Show.find({_id: {$in: favorites}}, '-__v');

    res.json({shows});
  } catch (error) {
    res.status(500).json({message: 'Server error'});
  }
};

// POST /users/me/favorites
const addShowToFavorites = async (req, res) => {
  const {showId} = req.body;
  const {userId} = req.user;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({message: `User not found`});
    }

    const isShowAdded = user.favorites.includes(showId);

    // check if show is alredy in favorites
    if (isShowAdded) {
      return res.status(400).json({message: 'Show is already added!'});
    }

    user.favorites.push(showId);
    await user.save({
      validateModifiedOnly: true,
    });

    res.json({message: 'Show successfully added'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// DELETE /users/me/favorites
const deleteShowFromFavorites = async (req, res) => {
  const {showId} = req.body;
  const {userId} = req.user;

  if (!showId) {
    return res.status(400).json({message: 'Please send showId'});
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({message: `User not found`});
    }

    user.favorites.remove(showId);

    await user.save({
      validateModifiedOnly: true,
    });

    res.json({message: 'Show successfully removed'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  getProfileInfo,
  deleteProfile,
  changeProfilePassword,
  getShowFavorites,
  addShowToFavorites,
  deleteShowFromFavorites,
};
