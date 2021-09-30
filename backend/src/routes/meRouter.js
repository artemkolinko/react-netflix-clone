const express = require('express');

const router = express.Router();
const {
  getProfileInfo,
  deleteProfile,
  changeProfilePassword,
  addShowToFavorites,
  deleteShowFromFavorites,
  getShowFavorites,
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

// /api/v1/users/me/favorites
// prettier-ignore
router.route('/favorites')
  .get(getShowFavorites)
  .post(addShowToFavorites)
  .delete(deleteShowFromFavorites);

module.exports = router;
