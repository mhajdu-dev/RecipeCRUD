const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')

const getRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).sort({createdAt: -1})

  res.status(200).json(recipes)
}

const getRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findById(id)

  if (!recipe) {
    return res.status(404).json({error: 'No such recipe'})
  }

  res.status(200).json(recipe)
}

const createRecipe = async (req, res) => {
  const {title, desc1, desc2, desc3} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!desc1) {
    emptyFields.push('desc1')
  }
  if (!desc2) {
    emptyFields.push('desc2')
  }
  if (!desc3) {
    emptyFields.push('desc3')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const recipe = await Recipe.create({ title, desc1, desc2, desc3 })
    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findOneAndDelete({_id: id})

  if(!recipe) {
    return res.status(400).json({error: 'No such recipe'})
  }

  res.status(200).json(recipe)
}

const updateRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!recipe) {
    return res.status(400).json({error: 'No such recipe'})
  }

  res.status(200).json(recipe)
}

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe
}