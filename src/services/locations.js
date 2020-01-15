const Location = require('../models/location');
const ResponseUtil = require('../utils/response');

const findLocations = () => new Promise((resolve, reject) => {
  Location.find()
    .then((locations) => resolve(ResponseUtil
      .createResponseData(
        true,
        200,
        locations.length === 0 ? "Locations Empty" : "Locations found",
        locations
      )
    ))
    .catch((err) => {
      console.error(err);

      reject(ResponseUtil
        .createResponseData(
          false,
          500,
          "Server Error"
        ));
    });
});

module.exports = {
  findLocations
};
