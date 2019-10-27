const { Router } = require('express');
const router = Router();


//import the model
const Post = require('../database/models/postSchema');

router.get('/users', (req, res) => {
    res.send('Ok in post routes');
  });


module.exports= router;