const express = require('express');
const dotenv = require('dotenv')
const { ApolloServer } = require('apollo-server');
const { gql } = require('graphql-tag');

const app = express()
dotenv.config();
const port = process.env.PORT || 3200
require('./db/database');




app.get('/', (req,res) => {
    return res.json({msg: 'Hello world'})
})

app.listen(port, ( ) => {
    console.log(`Listening to port ${port}`);
});