require('../models/database')

const User  = require('../models/User')
const { GraphQLList } = require('graphql')
const { } = require('../utils/auth')
const { UserType } = require('./types')


const users = {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
        return User.find()
    }
}


module.exports = {users}