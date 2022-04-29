require('../models/database')

const { GraphQLString, GraphQLID } = require('graphql')
const { createJwtToken } = require('../utils/auth');
const User = require('../models/User');
const Post = require('../models/Post');
const {PostType} = require("./types")


const register = {
    type: GraphQLString,
    description: "Registering users",
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

const login = {
    type: GraphQLString,
    description: "Logining in users",
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    },

    async resolve(parent, args) {
        const {email, password} = args;
        const user = await User.findOne({email:email})
        if (!user || password !== user.password){
            throw new Error('Email or Password is invalid')
            console.log('Wrong password')
        }

        const token = createJwtToken(user)
        return token
    }
}


const post = {
    type: PostType,
    description: "Create a post",
    args: {
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    },
    async resolve(parent, args, {verifiedUser}){
        console.log('Verified User', verifiedUser)
        if(!verifiedUser){
            throw new Error('Unauthorized User')
        }
        const {title, body } = args;

        const post = new Post(
            {authorId: verifiedUser.user._id,
            title:title,
            body: body
        })
        await post.save()
        return post
    }
}

module.exports = { register, login, post}