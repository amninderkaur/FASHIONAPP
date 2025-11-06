const Outfit = require('../models/outfitModel');

// Get all outfits
exports.getOutfits = async (req, res) => {
  const outfits = await Outfit.find();
  res.json(outfits);
};

// Add a new outfit
exports.addOutfit = async (req, res) => {
  const newOutfit = new Outfit(req.body);
  await newOutfit.save();
  res.status(201).json(newOutfit);
};
