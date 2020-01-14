const router = require('express').Router();
const { getLocations, addLocation } = require('../controllers/locations');

router.route('/')
  .get(getLocations)
  .post(addLocation);

module.exports = router;
