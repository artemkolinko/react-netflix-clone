const express = require('express');

const router = express.Router();
const {
  getProfileInfo,
  deleteProfile,
  changeProfilePassword,
} = require('../controllers/meControllers');

// /api/v1/users/me
// prettier-ignore
router.route('/')
  .get(getProfileInfo)
  .delete(deleteProfile);

// /api/v1/users/me/password
// prettier-ignore
router.route('/password')
  .patch(changeProfilePassword);

module.exports = router;
