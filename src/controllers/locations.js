const express = require('express');
const Location = require('../models/location');
const LocationService = require('../services/locations');
const ResponseUtil = require('../utils/response');

/**
 * @description GET all locations
 * @access Public
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getLocations = (req, res) => {
  LocationService.findLocations()
    .then(
      (responseData) => ResponseUtil
        .sendResponse(res, responseData)
    );
}

/**
 * @description Create a new location
 * @access Public
 * @param {express.Request} req
 * @param {express.Response} res
 */
const addLocation = (req, res) => {
  LocationService.createLocation(req.body)
    .then(
      (responseData) => ResponseUtil
        .sendResponse(res, responseData)
    );
}

module.exports = {
  getLocations,
  addLocation
};