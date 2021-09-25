const express = require('express');

const router = express.Router();
const {getShows} = require('../controllers/showControllers');

// /api/v1/shows
router.route('/').get(getShows);

module.exports = router;
