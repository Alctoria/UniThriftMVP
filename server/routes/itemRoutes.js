const express = require('express');
const router = express.Router();
const { getItems, addItem } = require('../controllers/itemController');
const auth = require('../middleware/auth');

router.get('/', getItems);
router.post('/', auth, addItem);

module.exports = router;