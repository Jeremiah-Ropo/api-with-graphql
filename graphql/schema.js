//Schema make use of the graphql package.


// Import required stuffs from graphql
const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const { } = require('./queries')

//Import mutations
const { } = require('./mutations')

// Define QueryType (A query type is a graphql object type. Every queryType takes a
//        name first, description and fields)
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: {

    }
})

// Define mutationType
const mutationType = new GraphQLObjectType({
    name: 'mutationType',
    description: 'Mutations',
    fields: {
        
    }
})


module.exports = new GraphQLSchema({
    query:QueryType,
    mutation:mutationType
})