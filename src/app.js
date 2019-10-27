require('dotenv').config();

const express= require ('express');
const morgan = require('morgan');

//Config files


//Model
const User = require('./database/models/userSchema');

//Routes
const appRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/usersRoutes');

// application
const app = express();

//Database
require('./database/database');

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




//routes
app.use(appRoutes);
app.use(authRoutes);

//debugging
app.use(morgan('dev'));



//error handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Server Error')
});


module.exports=app;