const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc1: {
    type: String,
    required: true
  },
  desc2: {
    type: String,
    required: true
  },
  desc3: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)