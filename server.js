const express = require('express');
const dotenv = require('dotenv')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./graphql/schema')
// const { ApolloServer } = require('apollo-server');
// const { gql } = require('graphql-tag');

const app = express()
dotenv.config();
const port = process.env.PORT || 3200
require('./db/database');

//JWT 
const {createJwtToken} = require('./utils/auth');
const {authenticate} = require('./middlewares/auth')

app.use(authenticate);



app.get('/', (req,res) => {
    console.log(req.verifiedUser)
    return res.json({msg: 'Welcome go to /graphql'})
})

app.get('/authen', (req,res) => {

    res.json(
        createJwtToken({
            username:'Jerry',
            email: 'jerry@gmail.com',
            password:'123456',
            displayName:'Jay',
            admin: "false"
        })
    )
})








app.post('/graphql', graphqlHTTP({
    schema,
    graphiql:false, //This gives the interface.
})).get('/graphql', graphqlHTTP({
    schema,
    graphiql:true, //This gives the interface.
}));





app.listen(port, ( ) => {
    console.log(`Listening to port ${port}`);
});