const {Router} = require('express');
const {getUsers, findUser} = require('../controllers/searchController');

const router = Router();

// api/v1/search
router.route('/').get(getUsers).post(findUser);

module.exports = router;
