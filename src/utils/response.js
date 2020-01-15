const express = require('express');

const ResponseUtil =
{
  /**
  * @param {boolean} success
  * @param {number} statusCode
  * @param {string} message
  * @param {any} data
  */
  createResponseData: (success, statusCode, message, data = undefined) => ({
    success,
    statusCode,
    message,
    data
  }),

  /**
   * @param {express.Response} res
   * @param {{success: string, statusCode: number, message: string, data?: any}} responseData
   */
  sendResponse: (res, responseData) => {
    res.status(responseData.statusCode)
      .json(responseData);
  }
};

module.exports = ResponseUtil;