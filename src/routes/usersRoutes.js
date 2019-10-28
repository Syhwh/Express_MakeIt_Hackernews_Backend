const { Router } = require('express');
const router = Router();

//import the model
const User = require('../database/models/userSchema');

router.post('/register', async (req, res, next) => {
  const userData = {
      name: req.body.userName,
      email: req.body.userEmail,
      password: req.body.userPassword,
  }
  try {
      const user = await User.create(userData)
      res.status(200).json({ message: 'User created' });
  } catch (err) {
      if (err.name === "ValidationError") {
          res.status(422).json({ errors: err.errors });
      } else {
          next(err);
      }
  }
});

router.post('/login', async (req, res, next) => {
  try {
      const user = await User.authenticate(req.body.userEmail, req.body.userPassword);
      if (user) {          
          res.status(200).send({ message: 'user logged' });
      } else {
          res.status(401).send({ error: 'Wrong email or password. Try again!' });
      }
  } catch (err) {
      if (err.name === "ValidationError") {
          res.status(422).json({ errors: err.errors });
      } else {
          res.status(401).send({ message: err });
          next(err);
      }
  }
});

router.post('/logout', async (req, res, next) => {
  try {
     
      res.status(200).send({ message: 'user logged out' });
  } catch (err) {
      res.status(401).send({ message: err });
      next(err)
  }
})

module.exports= router;