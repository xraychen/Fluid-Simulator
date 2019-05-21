const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.json({error: 'Token is not valid'});
    } else {
        jwt.verify(token, config.get('secret'), (err, decoded) => {
            if (err) {
                res.json({error: 'Token is not valid'});
            } else {
                req.user_id = decoded.id;
                next();
            }
        });
    }
}

module.exports = auth;