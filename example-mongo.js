'use strict';

const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  // ==> We have already a established a connection here
  //    to the test-tweets db.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  // ==> In typical node callback style, any program logic
  //     that will use the connection needs to be invoked
  //     from within here. A.K.A an "entry point" for a 
  //     database-connected app.
  const getTweets = (callback) => {
    db.collection('tweets').find().toArray(callback);
  }
  // ==> Later `getTweets` can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay! like this...
  // getTweets((err, tweets) => { ... })


  // ==> At the end, we close the connection.
  db.close(); 
})