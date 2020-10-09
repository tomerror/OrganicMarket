const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/:category/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public') + `/img/${req.params.category}/${req.params.id}.jpg`)
})

module.exports = router