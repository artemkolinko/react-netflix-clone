// const axios = require('axios').default;
const {Show} = require('../models/Show');

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

module.exports = {
  getShows,
};
