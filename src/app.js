
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
var cors = require('cors');

// application
const app = express();


//Model
const User = require('./database/models/userSchema');
// CORS middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
//Routes
const appRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/usersRoutes');
const commentRoutes = require('./routes/commentsRoutes');

//Database
require('./database/database');

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




//routes
app.use(appRoutes);
app.use(authRoutes);
app.use(commentRoutes);

//debugging
app.use(morgan('dev'));



//error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Server Error')
});


module.exports = app;