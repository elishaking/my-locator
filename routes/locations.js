const router = require('express').Router();
const { getLocations, addLocation } = require('../controllers/locations');

router.get('/', getLocations);
router.post('/', addLocation);

module.exports = router;
