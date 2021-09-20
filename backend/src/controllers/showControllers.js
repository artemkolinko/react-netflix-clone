const axios = require('axios').default;

// /api/v1/shows
const getShows = async (req, res) => {
  let {offset, limit} = req.query;

  offset = parseInt(offset) || 0;
  limit = parseInt(limit) || 10;

  try {
    const response = await axios.get('https://api.tvmaze.com/shows');
    res.send(response.data.slice(offset, offset + limit));
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  getShows,
};
