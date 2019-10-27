const { Router } = require('express');
const router = Router();

//import the model
const User = require('../database/models/userSchema');


/// Routes
router.get('/', (req, res) => {
    res.send('Ok in user routes');
  });

module.exports= router;