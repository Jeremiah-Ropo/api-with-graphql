require('../models/database')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');

const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');


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
    name: "Post",
    description: "Post type",
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      body: { type: GraphQLString },
      author: {
        type: UserType,
        async resolve(parent, args) {
          return User.findById(parent.authorId)
        },
      },
      comments: {
        type: new GraphQLList(CommentType),
        async resolve(parent, args) {
          return Comment.find({ postId: parent.id })
        },
      },
    }),
  })

  const CommentType = new GraphQLObjectType({
    name: "Comment",
    description: "Comment type",
    fields: () => ({
      id: { type: GraphQLID },
      comment: { type: GraphQLString },
      user: {
        type: new GraphQLList(UserType),
        async resolve(parent, args) {
            userid = parent.userId
          return User.findById(userid)
        },
      },
      post: {
        type: PostType,
        async resolve(parent, args) {
            // postid = parent.postId
          return Post.findById(parent.postId)
        },
      },
    }),
  })

module.exports = {UserType, CommentType, PostType}