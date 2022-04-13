const jwt = require('jsonwebtoken');

const key = process.env.JWT_KEY
const expires = process.env.JWT_EXPIRE

const createJwtToken = (user) => {
    return jwt.sign(user, key, {
        expiresIn: expires
    })
}

module.exports = {createJwtToken};