const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., shirt, pants
  color: String,
  size: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Outfit', outfitSchema);
