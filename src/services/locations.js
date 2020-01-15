const Location = require('../models/location');

const findLocations = () => new Promise((resolve, reject) => {
  Location.find()
    .then((locations) => resolve(locations))
    .catch((err) => {
      console.error(err);

      reject(err);
    });
});

module.exports = {
  findLocations
};
