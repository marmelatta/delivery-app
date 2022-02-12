const express = require('express');
const router = express.Router();
const Advertisement = require('../models/Advertisement')

/*router.get('/', async (req,  res) => {
    const {shortText, description} = req.body;
    const advertisements = await Advertisement.find({
        shortText,
        description,
        isDeleted: false
    });
    res.json(advertisements);
});

router.get('/:id', async (req,  res) => {
    const {id} = req.params;
    try {
        const advertisement = await Advertisement.findById(id).select('-__v');
        res.json(advertisement)
    }
    catch (e) {
        console.error(e);
        res.json('Ошибка получения объявления')
    }
});

router.post('', async (req, res) => {
    const {shortText, description} = req.body;
    
    const newAdvertisement = new Advertisement({shortText, description});
    try {
        const advertisement = await newAdvertisement.save();
        res.json(advertisement);
    } catch (e) {
        console.error('Ошибка добавления')
    }
})

router.delete('/delete', async (req, res) => {
    const {id} = req.params;
    
    try {
        await Advertisement.findByIdAndUpdate(id, {isDeleted: true});
        res.json(true);
    } catch (e) {
        console.error(e);
        res.status(404);
        res.json('Ошибка удаления')
    }
    res.json(`Hello delete ${id}`);
})

//загрузка картинок
router.post('/:id/upload-img', fileMiddleware.single('cover-img'), async (req, res) => {
    const {id} = req.params;
    try {
        await Advertisement.findByIdAndUpdate(id,  {$push: {images: req.file.filename}});
        const {path} = req.file;
        res.json(path);
    }
    catch (e) {
        console.error(e);
        res.json(null);
    }
})

//todo: отрефакторить
router.get('/:id/upload-img', async (req, res) => {
    const {id} = req.params;
    try {
        const advertisement = await Advertisement.findById(id,  'images');
        const fileName = advertisement.res.images;
        res.download(__dirname + '/../public' + fileName, 'cover.png', err => {
            if (err) {
                res.status(404).json();
            }
        });
    }
    catch (e) {
        console.error(e);
        res.status(404);
        res.json("");
    }
})*/

module.exports = router;