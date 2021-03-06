require('../models/database')

const User  = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const { GraphQLList, GraphQLString, GraphQLID, GraphQLObjectType } = require('graphql')
const { } = require('../utils/auth')
const { UserType, PostType, CommentType } = require('./types')
const req = require('express/lib/request')


const users = {
    type: new GraphQLList(UserType),
    description: "Retrieve all users",
    resolve(parent, args) {
        return User.find()
    }
}
//Queries is more like a search for or retrieving sth from the database....
//While working with Queries on the browser, you focus your mind on the way you structure your types.
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

const posts = {
    type: new GraphQLList(PostType),
    description: 'Retrieve all posts',
    resolve(parent, args){
        return Post.find()
    }
}


const userPost = {
    type: PostType,
    description: 'Retrieve user post by id and email',
    args: {id : { type: GraphQLID}, title: {type:GraphQLString}},
    async resolve(parent, args){
        const {id, title } = args;

        if (args.id){
            return Post.findById({_id:id})
        } else if(args.title){
            return Post.find({title:title})
        }
    }
}

const comments = {
    type: new GraphQLList(CommentType),
    description: "Retrieves list of comments",
    resolve(parent, args) {
      return Comment.find()
    },
  }
  
  const comment = {
    type: CommentType,
    description: "Retrieves one comment",
    args: { id: { type: GraphQLID } },
    resolve(_, args) {
      return Comment.findById(args.id)
    },
  }

module.exports = {users, user, userPost, posts, comment, comments}