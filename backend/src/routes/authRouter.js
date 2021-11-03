const express = require('express');

const router = express.Router();
const {signin, signup} = require('../controllers/authControllers');

// /api/v1/auth
router.route('/register').post(signup);
router.route('/login').post(signin);

module.exports = router;
