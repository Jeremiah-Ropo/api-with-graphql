require('../models/database')

const { GraphQLString, GraphQLID } = require('graphql')
const { createJwtToken } = require('../utils/auth');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const {PostType, CommentType} = require("./types")


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


const makePost = {
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
            {authorId: verifiedUser._id,
            title:title,
            body: body
        })
        await post.save()
        return post
    }
}
//To write a mutation you look at how you can fill the database/models


const makeComment = {
    type: CommentType,
    description: "Create a comment on the post",
    args: {
        comment : { type: GraphQLString},
        postId: { type: GraphQLString},
    },
    async resolve(parent, args, {verifiedUser}){

        if(!verifiedUser) {
            throw new Error('Login to comment')
        };

        const comment = new Comment({
            comment:args.comment,
            userId: verifiedUser._id,
            postId:args.postId
        })
        return comment.save()
    }
}

const updatePost = {
    type: PostType,
    description: "Update blog post",
    args : {
        id: { type: GraphQLString},
        title: { type: GraphQLString},
        body: { type: GraphQLString}
    },
    async resolve(parent, args, {verifiedUser}){
        if(!verifiedUser){
            throw new Error('Login to update!')
        };

        const {id, title, body} = args;
        const postUpdate = await Post.findOneAndUpdate(
            {_id: id, authorId:verifiedUser._id},
            {authorId:verifiedUser._id, title: title, body:body},
            {new:true, runValidators:true}
            )
            return postUpdate
        }
        
}

const deletePost = {
    type: PostType,
    description : "Delete a post",
    args : {
        id: {type: GraphQLID},
        title:{ type: GraphQLString}
    },

    async resolve(parent, args, {verifiedUser}){
        if(!verifiedUser){
            throw new Error("Can't delete this post")
        }
        try{
            const deletePost = await Post.findOneAndDelete(
                {_id: args.id, title: args.title}
            )
            if(!deletePost){
                throw new Error("No post id")
            }
            return "Post Deleted"
        }catch(err){
            throw err.message
        }
    }   
    
}




module.exports = { register, login, makePost, makeComment, updatePost, deletePost}