const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;