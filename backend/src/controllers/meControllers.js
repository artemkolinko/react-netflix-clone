/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const User = require('../models/User');

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

module.exports = {
  getProfileInfo,
  deleteProfile,
  changeProfilePassword,
};
