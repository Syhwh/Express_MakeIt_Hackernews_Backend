const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/config');
const verifyToken = require('../middleware/verifyToken');
//import the model
const User = require('../database/models/userSchema');

router.post('/signup', async (req, res, next) => {
  const userData = {
    name: req.body.userName,
    email: req.body.userEmail,
    password: req.body.userPassword,
  }
  try {
    const user = await User.create(userData);
    const token = jwt.sign({ id: user._id }, jwtConfig.secret, {
      expiresIn: 60 * 1000
    })
    res.status(200).json({ message: 'User created', userId: user._id, token });
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
      const token = jwt.sign({ id: user._id }, jwtConfig.secret, {
        expiresIn: 60 * 1000
      })
      return res.status(200).send({ message: 'user logged', userId: user._id, token });
    } else {
      return res.status(401).send({ error: 'Wrong email or password. Try again!' });
    }

  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json({ errors: err.errors });
    } else {
      res.status(401).send({ message: err });
      next(err);
    }
  }
});

router.post('/logout', verifyToken, async (req, res, next) => {
  try {
    req.userId = null;
    res.status(200).send({ message: 'user logged out' });
  } catch (err) {
    res.status(401).send({ message: err });
    next(err)
  }
});

router.post('/verify', async (req, res) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }
  const decoded = jwt.verify(token, jwtConfig.secret);
  res.status(200).send(decoded.id);
});









module.exports = router;