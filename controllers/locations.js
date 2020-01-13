const express = require('express');

/**
 * @description GET all locations
 * @access Public
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getLocations = (req, res) => {
  res.send('Locations');
}

module.exports = {
  getLocations
};