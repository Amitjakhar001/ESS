const express = require('express');
const router = express.Router();
const { getData, updateData } = require('../controllers/dataController');

router.get('/', getData);
router.post('/update', updateData);

module.exports = router;