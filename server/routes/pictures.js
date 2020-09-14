const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/:type/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public') + `/img/${req.params.type}/${req.params.id}.jpg`)
})

module.exports = router