const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Locations');
});

module.exports = router;
