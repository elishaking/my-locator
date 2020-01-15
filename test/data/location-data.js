const Location = require('../../src/models/location');

const location = {
  name: "My new house",
  address: "Rumuokwuta"
};

const invalidLocation = {
  address: "Rumuokwuta"
};

const locationModel = new Location(location);

module.exports = {
  location,
  invalidLocation,
  locationModel
};