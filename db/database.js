const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log(`Database connected`)
});


require('./Comment');
require('./Post');
require('./User');

module.exports = db;