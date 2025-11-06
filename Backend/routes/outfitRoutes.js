const express = require('express');
const router = express.Router();
const { getOutfits, addOutfit } = require('../controllers/outfitController');

router.get('/', getOutfits);
router.post('/', addOutfit);

module.exports = router;
