const Location = require('../models/location');
const ResponseUtil = require('../utils/response');

/**
 * @description GET all locations from database
 */
const findLocations = () => new Promise((resolve) => {
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

      resolve(ResponseUtil
        .createResponseData(
          false,
          500,
          "Server Error"
        ));
    });
});

/**
 * @description Create a new location in the database
 */
const createLocation = (locationData) => new Promise((resolve) => {
  Location.create(locationData)
    .then((location) => resolve(ResponseUtil
      .createResponseData(
        true,
        200,
        "Location Created",
        location
      )
    ))
    .catch((err) => {
      console.error(err);

      const statusAndMessage = {
        code: 500,
        message: "Server Error"
      };
      if (err.code === 11000) {
        statusAndMessage.code = 400;
        statusAndMessage.message = "This location already exists";
      }

      resolve(ResponseUtil
        .createResponseData(
          false,
          statusAndMessage.code,
          statusAndMessage.message
        )
      );
    });
});

module.exports = {
  findLocations,
  createLocation
};
