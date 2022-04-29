const express = require('express');
const dotenv = require('dotenv')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./graphql/schema')
// const { ApolloServer } = require('apollo-server');
// const { gql } = require('graphql-tag');

const app = express()
dotenv.config();

const port = process.env.PORT || 3200


//JWT 
const {authenticate} = require('./middlewares/auth')
app.use(authenticate);



app.get('/', (req,res) => {
    // console.log(req.verifiedUser)
    return res.json({msg: 'Welcome go to /graphql'})
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