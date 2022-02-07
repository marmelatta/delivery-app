const express = require('express');
const router = express.Router();

router.get('get/:id', (req,  res) => {
    const {id} = req.params;
    res.json(id);
});

router.post('/post', (req, res) => {
    res.json(`Hello post create ${req.params}`);
})

router.put('/put', (req, res) => {
    const {id} = req.params;

    const {title} = req.body;
    res.json(`Hello put update ${id} title: ${title}`);
})

router.delete('/delete', (req, res) => {
    const {id} = req.params;
    res.json(`Hello delete ${id}`);
})

module.exports = router;