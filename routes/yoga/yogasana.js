const express = require('express');
const router = express.Router();
const Yogasana = require('../../models/yogasana');

router.use(express.json());

// Get a List of Yoga Asanas
router.get('/', async (req, res) => {
    try {
        const per_page = req.query.per_page;
        const { by_type, by_meditation } = req.query;
        let filter = {};
        if (by_type) {
            filter.Type = by_type;
        }
        if (by_meditation) {
            filter.Suitable_For_Meditation = by_meditation === 'true';
        }
        const yogasana = await Yogasana.find(filter).limit(per_page);
        res.status(200).json(yogasana);
    } catch (error) {
        console.error('Error in / endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Get a random Yoga Asana
router.get('/random', async (req, res) => {
    const docQuantity = await Yogasana.countDocuments();
    const randomIndex = Math.floor(Math.random() * docQuantity);
    while(randomIndex == 91)
    {
        randomIndex = Math.floor(Math.random() * docQuantity);
    }
    const yogasana = await Yogasana.find().skip(randomIndex).limit(1);
    res.status(200).json(yogasana);
});

//Search Yoga Asanas based on the search keyword
router.get('/search', async (req, res) => {
    try {
        const search = String(req.query.search);
        const reExp = `.*${search}.*`;
        let re = new RegExp(reExp, 'gi');
        const yogasana = await Yogasana.find({Asana: re});
        res.status(200).send(yogasana);
    }
    catch(error)
    {
        console.log(error.message);
    }
});

// Get a single Yoga Asana
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const yogasana = await Yogasana.findById(id);
        if (!yogasana) {
            return res.status(404).json({ error: 'Yogasana not found' });
        }
        res.status(200).json(yogasana);
    } catch (error) {
        console.error('Error in /:id endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;