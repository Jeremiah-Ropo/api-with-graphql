//Schema make use of the graphql package.


// Import required stuffs from graphql
const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const { users, user, userPost } = require('./queries')

//Import mutations
const { register, login, post } = require('./mutations')

// Define QueryType (A query type is a graphql object type. Every queryType takes a
//        name first, description and fields)
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: {
        users,
        user,
        userPost
    }
})

// Define mutationType
const mutationType = new GraphQLObjectType({
    name: 'mutationType',
    description: 'Mutations',
    fields: {
        register,
        login,
        post,
    }
})


module.exports = new GraphQLSchema({
    query:QueryType,
    mutation:mutationType
})