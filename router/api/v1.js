const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route   POST api/v1/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) {
        res.json({error: 'Please enter all fields.'});
    } else {
        User.findOne({ email })
        .then((user) => {
            if (!user) {
                res.json({error: 'Incorrect email or password.'});
            } else {
                bcrypt.compare(pwd, user.pwd)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.json({error: 'Incorrect email or password.'})
                        } else {
                            jwt.sign(
                                {id: user.id},
                                config.get('secret'),
                                {expiresIn: 3600},
                                (err, token) => {
                                    res.cookie(
                                        'token', token, {httpOnly: true}
                                    )
                                        .json({
                                        success: 'Login success.'
                                    });
                                }
                            );
                        }
                 });
            }
        });
    }
});

// @route   POST api/v1/logout
// @desc    Logout user
// @access  Public
router.get('/logout', (req, res) => {
    res.clearCookie('token', {path: '/'}).json({success: 'User logout'});
});


module.exports = router;
