const express = require('express');
const Location = require('../models/location');

/**
 * @description GET all locations
 * @access Public
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getLocations = (req, res) => {
  Location.find()
    .then((locations) => res.status(200).json({
      success: true,
      count: locations.length,
      data: locations
    }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Server Error"
      });
    });
}

module.exports = {
  getLocations
};