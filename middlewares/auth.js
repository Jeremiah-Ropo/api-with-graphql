const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY
const authenticate = async (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1] || ""

    try {
        const verified = jwt.verify(token, key)
        req.verifiedUser = verified
        console.log("Verification successful", verified)
        next()
    } catch (error) {
        console.log(error.message)
        next()
    }
}

module.exports = {authenticate}