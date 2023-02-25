
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const signUp = (req, res, next) => {
    User.find({username: req.body.username}).exec().then(results => {
        if (results.length >= 1) {
            const error = new Error('Username already exists');
            error.status = 409;
            throw error;
        }

        bcrypt.hash(req.body.password, 5, (err, hash) => {
            if (err) {
                throw err;
            }
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash,
                createdOn: new Date()
            })
            
            user.save().then(result => {
                res.status(201).json({
                    name: 'Signup',
                    data: result
                })
            }).catch(err => {
                next(err);
            })
        })
    }).catch(err => {
        next(err);
    })
}


const login = (req, res, next) => {
    const user = User.find({username: req.body.username}).exec().then(user => {
        if (user.length === 0) {
            const error = new Error('Invalid username or password');
            error.status = 401;
            throw error;
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (result) {
                const token = jwt.sign(
                    {
                        username: user[0].username,
                        userId: user[0]._id,
                        userType: user[0].userType || ''
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                )
                return res.status(200).json({message: 'Authentication successful', token: token})
            }
            const error = new Error('Invalid username or password')
            error.status = 401;
            throw error;
        })
    }).catch(err => {
        next(err);
    })
}

module.exports = {signUp, login}
