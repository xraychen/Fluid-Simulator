const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/user
// @desc    Get user's data
// @access  private
router.get('/', auth, (req, res) => {
    User.findById(req.user_id)
        .select('-pwd')
        .then(user => {
            res.json({user, success: "User loged in, get info."});
        });
});

// @route   POST api/user
// @desc    Create user
// @access  Public
router.post('/', (req, res) => {
    const { email, name, pwd } = req.body;
    if (!email, !name || !pwd) {
        res.json({error: 'Please enter all fields.'});
    } else {
        User.findOne({ email })
        .then((user) => {
            if (user) {
                res.json({error: 'Email already registered.'});
            } else {
                bcrypt.genSalt((err, salt) => {
                bcrypt.hash(pwd, salt, (err, hash) => {
                    let newUser = User({
                            email: email,
                            name: name,
                            pwd: hash
                        });
                        newUser.save()
                            .then(user => {
                                jwt.sign(
                                    {id: user.id},
                                    config.get('secret'),
                                    {expiresIn: 3600},
                                    (err, token) => {
                                        res.cookie(
                                            'token', token, {httpOnly: true}
                                        )
                                            .json({
                                            success: 'Signup success.'
                                        });
                                    }
                                );
                            });
                    });
                });
            }
        });

    }
});

module.exports = router;
