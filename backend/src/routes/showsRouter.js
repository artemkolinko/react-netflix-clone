const express = require('express');

const router = express.Router();
const {
  getShows,
  addLike,
  deleteLike,
} = require('../controllers/showControllers');

// /api/v1/shows
router.route('/').get(getShows);

// /api/v1/shows/:id/like
// prettier-ignore
router.route('/:id/like')
  .post(addLike)
  .delete(deleteLike);

module.exports = router;
