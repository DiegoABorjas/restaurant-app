
const { Schema, model } = require('mongoose');

const beverageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  in_stock: {
    type: Boolean,
    required: true,
  },
  has_alcohol: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
  },
});

const Beverage = model('Beverage', beverageSchema);

module.exports = Beverage;








