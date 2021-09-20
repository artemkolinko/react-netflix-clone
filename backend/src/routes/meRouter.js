const express = require('express');
const router = express.Router();
const {
  getProfileInfo,
  deleteProfile,
  changeProfilePassword,
} = require('../controllers/meControllers');

// /api/v1/users/me
router.route('/').get(getProfileInfo).delete(deleteProfile);
// /api/v1/users/me/password
router.route('/password').patch(changeProfilePassword);

module.exports = router;
