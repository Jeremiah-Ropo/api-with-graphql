## api-with-graphql
I did a CURD operation api using graphql. It was a great experience. Graphql api is another architecture in api's sturcturing like RESTapi, in it we don't have to create a lot of data endpoints, but with just
one endpoint (/graphql) you can access each endpoints data you create. And on good thing about it is that, it's good for documentation.

### Graphql folder.
We have the Types, Schema, Mutations and Queries files. They both work together. Take for instance:
##### the Types: 
gives us the way or the picture of how the database will recieve and retreive data, with their specific
which are very essential. 
##### the Schema: 
It brings together the Mutations and Queries, to give response to the home route(/graphql). 
##### the Mutations:
This is where you can do the CURD operations. To write a mutation you look at how you can fill the database/models
##### the Queries:
This is where you get to retrieve data from the database. As the word "Query" to search for sth from the database. Queries is more like a search for or retrieving sth from the database....
While working with Queries on the browser, you focus your mind on the way you structure your types.

### How to connect it from server to browser ?

###### step 1
import graphql, require it into your *server.js/index.js/app.js* 

```
//import graphql
const schema = require('./graphql/schema')


//Create a post request to the home route (/graphql)
app.post('/graphql', graphqlHTTP({
    schema,
    graphiql:false, //This gives the interface.
})).get('/graphql', graphqlHTTP({
    schema,
    graphiql:true, //This gives the interface.
}));

```

###### step 2.
Connect models into each files of you're working on in the graphql folder.

#### End.
