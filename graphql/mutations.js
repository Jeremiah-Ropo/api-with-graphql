require('../models/database')

const { GraphQLString } = require('graphql')
const { createJwtToken } = require('../utils/auth');
const User = require('../models/User');

const register = {
    type: GraphQLString,
    args: {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        displayName: {type: GraphQLString},

    },
    async resolve(parent, args) {
       const { username, email, displayName, password } = args;
       const user = new User({username, email, displayName, password})

       await user.save()
       const token = createJwtToken(user)
       return token 
    }
}


module.exports = { register }