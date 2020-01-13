const router = require('express').Router();
const { getLocations } = require('../controllers/locations');

router.get('/', getLocations);

module.exports = router;
