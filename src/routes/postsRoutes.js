const { Router } = require('express');
const router = Router();


//import the model
const Post = require('../database/models/postSchema');

router.get('/', (req, res) => {
    res.status(200).json({ response: ok });
});


module.exports = router;