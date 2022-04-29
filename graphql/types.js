const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');

const { User, Post, Comment } = require('../models/database');


const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        displayName: {type: GraphQLString}
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post type',
    fields: () => ({
        id: {type:GraphQLID},
        title: {type:GraphQLString},
        body: { type: GraphQLString},
        author: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.authorId)
            },
        },
        comments: {
            type:new GraphQLList(CommentType),
            resolve(parent, args){
                return Comment.findById(parent.authorId)
            },
        },
    })
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: ' Comment type',
    fields: () => ({
        comment: {type:GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId)
            },
        },
        posts:{
            type: PostType,
            resolve(parent, args){
                return Post.findById(parent.postId)
            }
        }
    })
})



module.exports = {UserType, CommentType, PostType}