const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

url = process.env.MONGO_URI
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log(`Database connected`)
});


require('./Comment');
require('./Post');
require('./User');
