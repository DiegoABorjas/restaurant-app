
const { Schema, model } = require('mongoose');

const entreeSchema = new Schema({
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
  allergy: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
  },
});

const Entree = model('Entree', entreeSchema);

module.exports = Entree;



