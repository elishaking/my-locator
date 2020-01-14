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

/**
 * @description Create a new location
 * @access Public
 * @param {express.Request} req
 * @param {express.Response} res
 */
const addLocation = (req, res) => {
  Location.create(req.body)
    .then((location) => res.status(200).json({
      success: true,
      data: location
    }))
    .catch((err) => {
      console.error(err);

      if (err.code === 11000) {
        return res.status(400).json({
          success: false,
          error: "This location already exists"
        });
      }

      res.status(500).json({
        success: false,
        error: "Server Error"
      });
    });
}

module.exports = {
  getLocations,
  addLocation
};