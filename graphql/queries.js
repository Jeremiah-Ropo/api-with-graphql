require('../models/database')

const User  = require('../models/User')
const Post = require('../models/Post')
const { GraphQLList, GraphQLString, GraphQLID } = require('graphql')
const { } = require('../utils/auth')
const { UserType, PostType } = require('./types')
const req = require('express/lib/request')


const users = {
    type: new GraphQLList(UserType),
    description: "Retrieve all users",
    resolve(parent, args) {
        return User.find()
    }
}
//Queries is more like a search for....
const user = {
    type: UserType,
    description: "Retrieve one user by email and id",
    args: { email: {type: GraphQLString}, id:{type: GraphQLID}},
    async resolve(parent, args) {
        const { email , id } = args;
        
        if ( args.email) {
            return User.findOne({email:email})
        }else if( args.id){
            return User.findById({ _id: id })
        }
       
    }
}

const userPost = {
    type: PostType,
    description: 'Retrieve user post by id and email',
    args: {authorId : { type: GraphQLID}, title: {type:GraphQLString}},
    async resolve(parent, args){
        const { userId, title } = args;

        if (args.userId){
            return Post.findById({authorId:userId})
        } else if(args.title){
            return Post.find({title:title})
        }
    }
}

module.exports = {users, user, userPost}