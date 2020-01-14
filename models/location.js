const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const LocationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [10, 'Location ID must be less than 10 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// geocode and create location
// @ts-ignore
LocationSchema.pre('save', async function (next) {
  // @ts-ignore
  const loc = await geocoder.geocode(this.address);
  // @ts-ignore
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // prevent saving of address
  // @ts-ignore
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Location', LocationSchema);
