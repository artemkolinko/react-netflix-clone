/* eslint-disable consistent-return */
const Show = require('../models/Show');

// /api/v1/shows
const getShows = async (req, res) => {
  let {offset, limit} = req.query;

  offset = parseInt(offset, 10) || 0;
  limit = parseInt(limit, 10) || 100;

  try {
    const shows = await Show.find({}, '-__v').skip(offset).limit(limit);
    res.json({shows});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// POST /api/v1/shows/:id/like
const addLike = async (req, res) => {
  const {id} = req.params;
  const {userId} = req.user;

  try {
    const show = await Show.findById(id);

    if (!show) {
      return res.status(404).json({message: `Show not found`});
    }

    const isLiked = show.likes.includes(userId);

    // check if show is alredy liked
    if (isLiked) {
      return res.status(400).json({message: 'Show is already liked!'});
    }

    show.likes.push(userId);
    await show.save();

    res.json({message: 'Show successfully liked'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// DELETE /api/v1/shows/:id/like
const deleteLike = async (req, res) => {
  const {id} = req.params;
  const {userId} = req.user;

  try {
    const show = await Show.findById(id);

    if (!show) {
      return res.status(404).json({message: `Show not found`});
    }

    show.likes.remove(userId);
    await show.save();

    res.json({message: 'Show successfully unliked'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  getShows,
  addLike,
  deleteLike,
};
