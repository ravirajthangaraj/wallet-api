const express = require('express');

const app = express();

const morgan = require('morgan');

const bodyParser = require('body-parser');

// database config
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI);

// for logging the request
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// import api routes here
const userRouter = require('./api/routes/user');
const accountTypesRouter = require('./api/routes/account-types');
const accountRouter = require('./api/routes/account');
const transactionRouter = require('./api/routes/transactions');

// configure api routes here
app.use('/user', userRouter);
app.use('/account-types', accountTypesRouter);
app.use('/accounts', accountRouter);
app.use('/transaction', transactionRouter);

// this middleware will be used if any above url 
// configuration does not match with request url
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        version: process.env.APP_VERSION || '1.0.0', // TODO: get version from package.json
        error: {
            message: error.message
        }
    })
});

// export the app to provide to the server
module.exports = app;
